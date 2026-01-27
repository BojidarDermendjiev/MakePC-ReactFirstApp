import { useContext, useState, useRef, useEffect, useCallback } from "react";
import styles from "../../assets/styles/userSettings.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import requester from "../../api/requester";
import {
  serverApiUrl,
  serverOrigin,
  serverEndpoints,
} from "../../common/generic";
import PasswordModal from "./PasswordModal";

// Icons for settings sections
const ProfileIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SecurityIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AvatarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const UserSettings = () => {
  const { user, setUser } = useContext(AuthContext);

  // Active section state
  const [activeSection, setActiveSection] = useState("profile");

  // Profile state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [localPreview, setLocalPreview] = useState("");
  const fileInputRef = useRef();

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalMessage, setPasswordModalMessage] = useState("");

  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  // Clear messages when switching sections
  useEffect(() => {
    setError("");
    setSuccess("");
  }, [activeSection]);

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setAvatarFile(file);
    }
  }, []);

  const handleProfileSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      try {
        const payload = { fullName, email, role: user.role };
        await requester.put(
          `${serverApiUrl}${serverEndpoints.updateUserById(user.id)}`,
          payload,
        );

        setSuccess("Profile updated successfully!");
        setUser({ ...user, fullName, email });
      } catch (err) {
        setError(err?.error || err?.message || "Failed to update profile.");
      } finally {
        setLoading(false);
      }
    },
    [user, fullName, email, setUser],
  );

  const handleAvatarSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!avatarFile) {
        setError("Please select an image first.");
        return;
      }

      setError("");
      setSuccess("");
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await requester.put(
          `${serverApiUrl}/user/${user.id}/avatar`,
          formData,
        );

        let uploadedAvatarUrl = avatarPreview;
        if (avatarRes?.avatarUrl) {
          uploadedAvatarUrl = avatarRes.avatarUrl.startsWith("http")
            ? avatarRes.avatarUrl
            : `${serverOrigin}${avatarRes.avatarUrl}`;
          setAvatarPreview(uploadedAvatarUrl);
        }

        setSuccess("Avatar updated successfully!");
        setUser({ ...user, avatarUrl: uploadedAvatarUrl });

        // Cleanup
        if (localPreview) {
          URL.revokeObjectURL(localPreview);
        }
        setLocalPreview("");
        setAvatarFile(null);
      } catch (err) {
        setError(err?.error || err?.message || "Failed to update avatar.");
      } finally {
        setLoading(false);
      }
    },
    [user, avatarFile, avatarPreview, localPreview, setUser],
  );

  const handlePasswordSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setPasswordModalMessage("");

      if (!currentPassword || currentPassword.length < 2) {
        setError("Current password must be at least 2 characters.");
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
      }

      setLoading(true);

      try {
        await requester.post(
          `${serverApiUrl}${serverEndpoints.changeUserPassword(user.id)}`,
          { oldPassword: currentPassword, newPassword },
        );

        setSuccess("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err) {
        const errorMessage =
          err?.error === "Current password is incorrect."
            ? "Incorrect current password. Please try again."
            : err?.error || "Failed to change password.";
        setPasswordModalMessage(errorMessage);
        setShowPasswordModal(true);
      } finally {
        setLoading(false);
      }
    },
    [currentPassword, newPassword, confirmPassword, user],
  );

  const closePasswordModal = useCallback(() => setShowPasswordModal(false), []);

  const sections = [
    { id: "profile", label: "Profile", icon: <ProfileIcon /> },
    { id: "avatar", label: "Avatar", icon: <AvatarIcon /> },
    { id: "security", label: "Security", icon: <SecurityIcon /> },
  ];

  return (
    <div className={styles.settingsContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Settings</h2>
        <nav className={styles.sidebarNav}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.navItem} ${activeSection === section.id ? styles.navItemActive : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile Information</h3>
            <p className={styles.sectionDescription}>
              Update your personal information and email address.
            </p>
            <form className={styles.form} onSubmit={handleProfileSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                  disabled={loading}
                  placeholder="Enter your full name"
                />
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}

        {/* Avatar Section */}
        {activeSection === "avatar" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile Picture</h3>
            <p className={styles.sectionDescription}>
              Upload a new profile picture. Supported formats: JPG, PNG, GIF,
              WebP.
            </p>
            <form className={styles.form} onSubmit={handleAvatarSubmit}>
              <div className={styles.avatarSection}>
                <div className={styles.currentAvatar}>
                  <img
                    src={localPreview || avatarPreview || "/img/image.png"}
                    alt="Current Avatar"
                    className={styles.avatarLarge}
                  />
                </div>
                <div className={styles.avatarUpload}>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    disabled={loading}
                    className={styles.fileInput}
                  />
                  <label htmlFor="avatar" className={styles.uploadLabel}>
                    Choose Image
                  </label>
                  {avatarFile && (
                    <span className={styles.fileName}>{avatarFile.name}</span>
                  )}
                </div>
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={loading || !avatarFile}
              >
                {loading ? "Uploading..." : "Update Avatar"}
              </button>
            </form>
          </div>
        )}

        {/* Security Section */}
        {activeSection === "security" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Change Password</h3>
            <p className={styles.sectionDescription}>
              Update your password to keep your account secure.
            </p>
            <form className={styles.form} onSubmit={handlePasswordSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>

      <PasswordModal
        show={showPasswordModal}
        message={passwordModalMessage}
        onClose={closePasswordModal}
      />
    </div>
  );
};

export default UserSettings;
