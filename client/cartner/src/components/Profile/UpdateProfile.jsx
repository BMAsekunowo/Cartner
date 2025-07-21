import React, { useState, useEffect } from "react";
import Button from "../Reusables/Button";
import { getMyProfile, updateProfile } from "../../services/ProfileService";
import { toast } from "react-toastify";
import "../../styles/EditProfile.css";

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    languages: "",
    occupation: "",
    phoneNumber: "",
  });

  const [enabledFields, setEnabledFields] = useState({
    name: false,
    bio: false,
    location: false,
    languages: false,
    occupation: false,
    phoneNumber: false,
    avatar: false,
  });

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMyProfile(token);
        setProfile({
          name: data.user?.name || "",
          bio: data.bio || "",
          location: data.location || "",
          languages: (data.languages || []).join(", "),
          occupation: data.occupation || "",
          phoneNumber: data.phoneNumber || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleCheckboxToggle = (field) => {
    setEnabledFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(enabledFields).forEach((key) => {
        if (enabledFields[key]) {
          if (key === "languages") {
            formData.append(
              "languages",
              JSON.stringify(profile.languages.split(",").map((l) => l.trim())),
            );
          } else if (key === "avatar" && avatarFile) {
            formData.append("avatar", avatarFile);
          } else {
            formData.append(key, profile[key]);
          }
        }
      });

      await updateProfile(token, formData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form
      className="edit-profile-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="edit-profile-title">Edit Your Profile</h2>

      {[
        { label: "Name", name: "name", type: "text", autoComplete: "name" },
        { label: "Bio", name: "bio", type: "textarea", autoComplete: "off" },
        {
          label: "Location",
          name: "location",
          type: "text",
          autoComplete: "address-level2",
        },
        {
          label: "Languages (comma-separated)",
          name: "languages",
          type: "text",
          autoComplete: "off",
        },
        {
          label: "Occupation",
          name: "occupation",
          type: "text",
          autoComplete: "organization-title",
        },
        {
          label: "Phone Number",
          name: "phoneNumber",
          type: "text",
          autoComplete: "tel",
        },
      ].map(({ label, name, type, autoComplete }) => (
        <div className="edit-profile-field" key={name}>
          <label htmlFor={name} className="edit-profile-label">
            <input
              type="checkbox"
              checked={enabledFields[name]}
              onChange={() => handleCheckboxToggle(name)}
              id={`check-${name}`}
            />
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              className="edit-profile-input"
              value={profile[name]}
              onChange={handleChange}
              rows="3"
              disabled={!enabledFields[name]}
              autoComplete={autoComplete}
            />
          ) : (
            <input
              id={name}
              name={name}
              className="edit-profile-input"
              type="text"
              value={profile[name]}
              onChange={handleChange}
              disabled={!enabledFields[name]}
              autoComplete={autoComplete}
            />
          )}
        </div>
      ))}

      {/* Avatar Upload */}
      <div className="edit-profile-field">
        <label htmlFor="avatar" className="edit-profile-label">
          <input
            type="checkbox"
            id="check-avatar"
            checked={enabledFields.avatar}
            onChange={() => handleCheckboxToggle("avatar")}
          />
          Upload Avatar
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={handleFileChange}
          disabled={!enabledFields.avatar}
        />
      </div>

      <Button size="lg" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default UpdateProfile;
