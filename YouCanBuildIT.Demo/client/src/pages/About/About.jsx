import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/about.module.css";
import { navigation } from "../../context/common/navigations";

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <section className={styles.about}>
        <h1 className={styles.mainTitle}>{t("about.title")}</h1>
        <ol className={styles.reasons}>
          <li className={styles.introduction}>
            <article className={styles.topic}>
              <h2 className={styles.title}>{t("about.titleIntroduction")}</h2>
              <p>{t("about.description")}</p>
              <ul className={styles.hardwareListItems}>
                <li className={styles.reason}>{t("about.components.cpu")}</li>
                <li className={styles.reason}>
                  {t("about.components.motherboard")}
                </li>
                <li className={styles.reason}>{t("about.components.ram")}</li>
                <li className={styles.reason}>
                  {t("about.components.storage")}
                </li>
                <li className={styles.reason}>{t("about.components.psu")}</li>
                <li className={styles.reason}>
                  {t("about.components.graphicsCard")}
                </li>
                <li className={styles.reason}>{t("about.components.case")}</li>
                <li className={styles.reason}>
                  {t("about.components.coolingSystem")}
                </li>
              </ul>
            </article>
            <img
              src="../../src/assets/img/image-removebg-preview (8).png"
              alt="tools"
            />
          </li>
          <li className={styles.intro}>
            <img
              src="../../src/assets/img/image-removebg-preview (25).png"
              alt="computer components"
            />
            <article className={styles.prepare}>
              <h2 className={styles.title}>
                {t("about.prepareWorkspace.title")}
              </h2>
              <p>{t("about.prepareWorkspace.description")}</p>
            </article>
          </li>
          <li className={styles.cpu}>
            <article className={styles.info}>
              <h2 className={styles.title}>{t("about.installCPU.title")}</h2>
              <p>{t("about.installCPU.description")}</p>
            </article>
            <img
              src="../../src/assets/img/image-removebg-preview (10).png"
              alt="cpu"
            />
          </li>
          <li className={styles.ram}>
            <img
              src="../../src/assets/img/image-removebg-preview (16).png"
              alt=""
            />
            <article className={styles.info}>
              <h2 className={styles.title}>{t("about.installRAM.title")}</h2>
              <p>{t("about.installRAM.description")}</p>
            </article>
          </li>
          <li className={styles.motherboard}>
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.mountMotherboard.title")}
              </h2>
              <p>{t("about.mountMotherboard.description")}</p>
            </article>
            <img
              src="../../src/assets/img/image-removebg-preview (17).png"
              alt="motherboard"
            />
          </li>
          <li className={styles.powerSupply}>
            <img
              src="../../src/assets/img/image-removebg-preview (18).png"
              alt="power supply"
            />
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.installPowerSupply.title")}
              </h2>
              <p>{t("about.installPowerSupply.description")}</p>
            </article>
          </li>
          <li className={styles.storage}>
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.installStorage.title")}
              </h2>
              <p>{t("about.installStorage.description")}</p>
            </article>
            <img
              src="../../src/assets/img/image-removebg-preview (19).png"
              alt="storage"
            />
          </li>
          <li className={styles.graphicsCard}>
            <img
              src="../../src/assets/img/image-removebg-preview (20).png"
              alt="graphics card"
            />
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.installGraphicsCard.title")}
              </h2>
              <p>{t("about.installGraphicsCard.description")}</p>
            </article>
          </li>
          <li className={styles.cables}>
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.connectAllCables.title")}
              </h2>
              <p>{t("about.connectAllCables.description")}</p>
            </article>
            <img
              src="../../src/assets/img/maxresdefault.jpg"
              alt="cables system"
            />
          </li>
          <li className={styles.cooling}>
            <img
              src="../../src/assets/img/image-removebg-preview (21).png"
              alt="colling system"
            />
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.installCoolingSystem.title")}
              </h2>
              <p>{t("about.installCoolingSystem.description")}</p>
            </article>
          </li>
          <li className={styles.powerOn}>
            <article className={styles.info}>
              <h2 className={styles.title}>
                {t("about.powerOnAndTest.title")}
              </h2>
              <p>{t("about.powerOnAndTest.description")}</p>
            </article>
            <img
              src="../../src/assets/img/s9-u05-38-lifestyle-battlestation-built-pc-with-talent-original-rwd.jpg.rendition.intel.web.1920.1080.jpg"
              alt="finished pc"
            />
          </li>
          <li className={styles.os}>
            <article className={styles.osLogo}>
              <Link
                className={styles.link}
                to={navigation.getMicrosoftUrl()}
                target="_blank"
              >
                <img
                  src="../../src/assets/img/image-removebg-preview (22).png"
                  alt="windows logo"
                />
              </Link>
              <Link
                className={styles.link}
                to={navigation.getLinuxUrl()}
                target="_blank"
              >
                <img
                  src="../../src/assets/img/image-removebg-preview (23).png"
                  alt=" linux logo"
                />
              </Link>
              <Link
                className={styles.link}
                to={navigation.getIOSUrl()}
                target="_blank"
              >
                <img
                  src="../../src/assets/img/image-removebg-preview (24).png"
                  alt="ios logo"
                />
              </Link>
            </article>
            <article className={styles.osInfo}>
              <h2 className={styles.title}>{t("about.installOS.title")}</h2>
              <p>{t("about.installOS.description")}</p>
            </article>
          </li>
        </ol>
      </section>
    </>
  );
}
