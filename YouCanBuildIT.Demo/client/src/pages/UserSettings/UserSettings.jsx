
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/userSettings.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import requester from "../../API/requester";
import {
  serverApiUrl,
  serverOrigin,
  serverEndpoints,
} from "../../common/generic";
import PasswordModal from "./PasswordModal";

const UserSettings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");
  const [avatarFile, setAvatarFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordModalMessage, setPasswordModalMessage] = useState("");

  const fileInputRef = useRef();
  const [localPreview, setLocalPreview] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setLocalPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setPasswordModalMessage("");
    setLoading(true);

    if (newPassword) {
      if (!currentPassword || currentPassword.length < 2) {
        setPasswordModalMessage(
          "Current password must be at least 2 characters."
        );
        setShowPasswordModal(true);
        setLoading(false);
        return;
      }
      try {
        await requester.post(
          `${serverApiUrl}${serverEndpoints.changeUserPassword(user.id)}`,
          { oldPassword: currentPassword, newPassword }
        );
        setCurrentPassword("");
        setNewPassword("");
      } catch (err) {
        setPasswordModalMessage(
          err?.error === "Current password is incorrect."
            ? "Incorrect current password. Please try again."
            : err?.error ||
                "Current password is incorrect. Cannot change password."
        );
        setShowPasswordModal(true);
        setLoading(false);
        return;
      }
    }

    try {
      let uploadedAvatarUrl = avatarPreview;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await requester.put(
          `${serverApiUrl}/user/${user.id}/avatar`,
          formData
        );

        if (avatarRes && avatarRes.avatarUrl) {
          // If backend returns relative path like "/uploads/avatars/..", prepend origin (NO /api).
          uploadedAvatarUrl = avatarRes.avatarUrl.startsWith("http")
            ? avatarRes.avatarUrl
            : `${serverOrigin}${avatarRes.avatarUrl}`;
          setAvatarPreview(uploadedAvatarUrl);
          console.log("New uploadedAvatarUrl:", uploadedAvatarUrl);
        } else {
          console.log("No avatarUrl received!", avatarRes);
        }
      }

      const payload = { fullName, email, role: user.role };
      await requester.put(
        `${serverApiUrl}${serverEndpoints.updateUserById(user.id)}`,
        payload
      );

      setProfileSuccess("Profile updated!");
      setUser({ ...user, fullName, email, avatarUrl: uploadedAvatarUrl });
      setLocalPreview("");
      setAvatarFile(null);
      navigate("/");
    } catch (err) {
      setProfileError(
        err?.error || err?.message || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const closePasswordModal = () => setShowPasswordModal(false);

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>
        <span role="img" aria-label="settings">
          ⚙️
        </span>{" "}
        User Settings
      </h2>
      <form className={styles.settingsForm} onSubmit={handleProfileSubmit}>
        {profileError && <div className={styles.error}>{profileError}</div>}
        {profileSuccess && (
          <div className={styles.success}>{profileSuccess}</div>
        )}
        {loading && <div className={styles.loading}>Saving...</div>}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
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
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="avatar">Avatar</label>
          <div className={styles.avatarInput}>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              disabled={loading}
            />
            {(localPreview || avatarPreview) && (
              <img
                src={localPreview || avatarPreview}
                alt="Avatar Preview"
                className={styles.avatarPreview}
              />
            )}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            autoComplete="current-password"
            disabled={loading}
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
          />
        </div>
        <button className={styles.saveButton} type="submit" disabled={loading}>
          <span role="img" aria-label="save">
            💾
          </span>{" "}
          Save Profile
        </button>
      </form>

      <PasswordModal
        show={showPasswordModal}
        message={passwordModalMessage}
        onClose={closePasswordModal}
      />
    </div>
  );
};

export default UserSettings;
