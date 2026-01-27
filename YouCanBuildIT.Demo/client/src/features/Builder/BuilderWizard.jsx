import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider";
import * as buildService from "../../api/buildService";
import * as productService from "../../api/productService";
import ComponentStep from "./ComponentStep";
import CompatibilityAlert from "./CompatibilityAlert";
import BuildSummary from "./BuildSummary";

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

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Step = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid ${(props) => (props.$active ? "#2563eb" : props.$completed ? "#10b981" : "#e5e7eb")};
  background: ${(props) => (props.$active ? "#eff6ff" : props.$completed ? "#ecfdf5" : "white")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &:hover {
    border-color: #2563eb;
  }

  span.icon {
    font-size: 1.25rem;
  }

  span.check {
    color: #10b981;
    font-weight: bold;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StepContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PurposeSelector = styled.div`
  margin-bottom: 2rem;
`;

const PurposeLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PurposeSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const BuildNameInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #2563eb;
  color: white;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fef3c7;
  border-radius: 8px;
  margin-bottom: 1rem;

  a {
    color: #2563eb;
    font-weight: 600;
  }
`;

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
      const response = await buildService.getBuildSuggestions(build.id, componentType);
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

      // Auto-advance to next step
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
    if (!build?.items) return { completed: false, active: index === currentStep };
    const stepType = COMPONENT_STEPS[index].type;
    const hasComponent = build.items.some((i) => i.componentType === stepType);
    return {
      completed: hasComponent,
      active: index === currentStep,
    };
  };

  return (
    <Container>
      <Header>
        <Title>{t("builder.title", "PC Builder")}</Title>
      </Header>

      {!isAuthenticated && (
        <LoginPrompt>
          {t("builder.loginPrompt", "Please")}{" "}
          <a href="/login">{t("builder.login", "log in")}</a>{" "}
          {t("builder.toSaveBuilds", "to save your builds.")}
        </LoginPrompt>
      )}

      {!build ? (
        <StepContent>
          <h2>{t("builder.startNew", "Start a New Build")}</h2>
          <PurposeSelector>
            <PurposeLabel>{t("builder.buildName", "Build Name")}</PurposeLabel>
            <BuildNameInput
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder={t("builder.namePlaceholder", "My Gaming PC")}
            />

            <PurposeLabel>{t("builder.purpose", "Purpose")}</PurposeLabel>
            <PurposeSelect value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="Gaming">{t("builder.gaming", "Gaming")}</option>
              <option value="Office">{t("builder.office", "Office / Productivity")}</option>
              <option value="Content Creation">{t("builder.content", "Content Creation")}</option>
              <option value="Workstation">{t("builder.workstation", "Workstation")}</option>
              <option value="Budget">{t("builder.budget", "Budget Build")}</option>
            </PurposeSelect>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              {t("builder.makePublic", "Make this build public")}
            </label>
          </PurposeSelector>

          <PrimaryButton onClick={handleStartBuild} disabled={loading || !isAuthenticated}>
            {loading ? t("loading", "Loading...") : t("builder.startBuilding", "Start Building")}
          </PrimaryButton>
        </StepContent>
      ) : (
        <>
          <StepIndicator>
            {COMPONENT_STEPS.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <Step
                  key={step.type}
                  $active={status.active}
                  $completed={status.completed}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="icon">{step.icon}</span>
                  <span>{t(`builder.${step.type.toLowerCase()}`, step.type)}</span>
                  {status.completed && <span className="check">✓</span>}
                  {step.required && !status.completed && <span style={{ color: "#ef4444" }}>*</span>}
                </Step>
              );
            })}
          </StepIndicator>

          <MainContent>
            <StepContent>
              <ComponentStep
                componentType={currentStepInfo.type}
                products={products}
                suggestions={suggestions}
                selectedItem={build.items?.find((i) => i.componentType === currentStepInfo.type)}
                onSelect={handleAddComponent}
                onRemove={handleRemoveComponent}
                loading={loading}
              />
            </StepContent>

            <Sidebar>
              <BuildSummary
                build={build}
                onRemoveItem={handleRemoveComponent}
              />

              {compatibility && (
                <CompatibilityAlert compatibility={compatibility} />
              )}

              <ActionButtons>
                <SecondaryButton
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  {t("builder.previous", "Previous")}
                </SecondaryButton>
                {currentStep < COMPONENT_STEPS.length - 1 ? (
                  <PrimaryButton
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    {t("builder.next", "Next")}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={handleSaveBuild} disabled={loading}>
                    {t("builder.saveBuild", "Save Build")}
                  </PrimaryButton>
                )}
              </ActionButtons>
            </Sidebar>
          </MainContent>
        </>
      )}
    </Container>
  );
}
