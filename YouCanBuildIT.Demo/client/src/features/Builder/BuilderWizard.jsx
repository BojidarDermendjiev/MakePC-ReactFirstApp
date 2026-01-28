import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider";
import * as buildService from "../../api/buildService";
import * as productService from "../../api/productService";
import ComponentStep from "./ComponentStep";
import CompatibilityAlert from "./CompatibilityAlert";
import BuildSummary from "./BuildSummary";
import styles from "../../assets/styles/builderWizard.module.css";

const COMPONENT_STEPS = [
  { type: "CPU", icon: "🧠", required: true },
  { type: "Motherboard", icon: "📟", required: true },
  { type: "RAM", icon: "💾", required: true },
  { type: "GPU", icon: "🎮", required: false },
  { type: "Storage", icon: "💿", required: true },
  { type: "PSU", icon: "⚡", required: true },
  { type: "Case", icon: "🖥️", required: true },
  { type: "Cooler", icon: "❄️", required: false },
];

export default function BuilderWizard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState(null);
  const [buildName, setBuildName] = useState("");
  const [purpose, setPurpose] = useState("Gaming");
  const [isPublic, setIsPublic] = useState(false);
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const currentStepInfo = COMPONENT_STEPS[currentStep];

  useEffect(() => {
    fetchProducts();
  }, [currentStep]);

  useEffect(() => {
    if (build?.id) {
      checkCompatibility();
      fetchSuggestions();
    }
  }, [build]);

  const fetchProducts = async () => {
    try {
      const componentType = COMPONENT_STEPS[currentStep].type;
      const response = await productService.getFilteredProducts({
        page: 1,
        size: 50,
        search: componentType,
      });
      setProducts(response.items || response || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const fetchSuggestions = async () => {
    if (!build?.id) return;
    try {
      const componentType = COMPONENT_STEPS[currentStep].type;
      const response = await buildService.getBuildSuggestions(
        build.id,
        componentType,
      );
      setSuggestions(response || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const checkCompatibility = async () => {
    if (!build?.id) return;
    try {
      const result = await buildService.checkBuildCompatibility(build.id);
      setCompatibility(result);
    } catch (error) {
      console.error("Error checking compatibility:", error);
    }
  };

  const handleStartBuild = async () => {
    if (!isAuthenticated) return;
    if (!buildName.trim()) {
      alert(t("builder.enterName", "Please enter a build name"));
      return;
    }

    setLoading(true);
    try {
      const newBuild = await buildService.createBuild({
        name: buildName,
        purpose,
        isPublic,
        description: "",
      });
      setBuild(newBuild);
    } catch (error) {
      console.error("Error creating build:", error);
      alert(t("builder.createError", "Failed to create build"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = async (product) => {
    if (!build?.id) return;
    setLoading(true);
    try {
      const item = await buildService.addBuildItem(build.id, {
        productId: product.id,
        componentType: COMPONENT_STEPS[currentStep].type,
        quantity: 1,
      });

      setBuild((prev) => ({
        ...prev,
        items: [...(prev.items || []), item],
        totalPriceBgn: (prev.totalPriceBgn || 0) + product.price,
      }));

      if (currentStep < COMPONENT_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error("Error adding component:", error);
      alert(error.message || t("builder.addError", "Failed to add component"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveComponent = async (itemId) => {
    if (!build?.id) return;
    setLoading(true);
    try {
      await buildService.removeBuildItem(build.id, itemId);
      setBuild((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId),
      }));
    } catch (error) {
      console.error("Error removing component:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBuild = async () => {
    if (!build?.id) return;
    setLoading(true);
    try {
      await buildService.updateBuild(build.id, {
        name: buildName,
        purpose,
        isPublic,
        description: "",
      });
      alert(t("builder.saved", "Build saved successfully!"));
      navigate("/builder/my-builds");
    } catch (error) {
      console.error("Error saving build:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (index) => {
    if (!build?.items)
      return { completed: false, active: index === currentStep };
    const stepType = COMPONENT_STEPS[index].type;
    const hasComponent = build.items.some((i) => i.componentType === stepType);
    return {
      completed: hasComponent,
      active: index === currentStep,
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("builder.title", "PC Builder")}</h1>
      </div>

      {!isAuthenticated && (
        <div className={styles.loginPrompt}>
          {t("builder.loginPrompt", "Please")}{" "}
          <a href="/login">{t("builder.login", "log in")}</a>{" "}
          {t("builder.toSaveBuilds", "to save your builds.")}
        </div>
      )}

      {!build ? (
        <div className={styles.stepContent}>
          <h2>{t("builder.startNew", "Start a New Build")}</h2>
          <div className={styles.purposeSelector}>
            <label className={styles.purposeLabel}>
              {t("builder.buildName", "Build Name")}
            </label>
            <input
              className={styles.buildNameInput}
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder={t("builder.namePlaceholder", "My Gaming PC")}
            />

            <label className={styles.purposeLabel}>
              {t("builder.purpose", "Purpose")}
            </label>
            <select
              className={styles.purposeSelect}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="Gaming">{t("builder.gaming", "Gaming")}</option>
              <option value="Office">
                {t("builder.office", "Office / Productivity")}
              </option>
              <option value="Content Creation">
                {t("builder.content", "Content Creation")}
              </option>
              <option value="Workstation">
                {t("builder.workstation", "Workstation")}
              </option>
              <option value="Budget">
                {t("builder.budget", "Budget Build")}
              </option>
            </select>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              {t("builder.makePublic", "Make this build public")}
            </label>
          </div>

          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleStartBuild}
            disabled={loading || !isAuthenticated}
          >
            {loading
              ? t("loading", "Loading...")
              : t("builder.startBuilding", "Start Building")}
          </button>
        </div>
      ) : (
        <>
          <div className={styles.stepIndicator}>
            {COMPONENT_STEPS.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <button
                  key={step.type}
                  className={`${styles.step} ${status.active ? styles.stepActive : ""} ${
                    status.completed ? styles.stepCompleted : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className={styles.stepIcon}>{step.icon}</span>
                  <span>
                    {t(`builder.${step.type.toLowerCase()}`, step.type)}
                  </span>
                  {status.completed && (
                    <span className={styles.stepCheck}>✓</span>
                  )}
                  {step.required && !status.completed && (
                    <span className={styles.stepRequired}>*</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.mainContent}>
            <div className={styles.stepContent}>
              <ComponentStep
                componentType={currentStepInfo.type}
                products={products}
                suggestions={suggestions}
                selectedItem={build.items?.find(
                  (i) => i.componentType === currentStepInfo.type,
                )}
                onSelect={handleAddComponent}
                onRemove={handleRemoveComponent}
                loading={loading}
              />
            </div>

            <div className={styles.sidebar}>
              <BuildSummary
                build={build}
                onRemoveItem={handleRemoveComponent}
              />

              {compatibility && (
                <CompatibilityAlert compatibility={compatibility} />
              )}

              <div className={styles.actionButtons}>
                <button
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  {t("builder.previous", "Previous")}
                </button>

                {currentStep < COMPONENT_STEPS.length - 1 ? (
                  <button
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    {t("builder.next", "Next")}
                  </button>
                ) : (
                  <button
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={handleSaveBuild}
                    disabled={loading}
                  >
                    {t("builder.saveBuild", "Save Build")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
