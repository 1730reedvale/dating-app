import React, { useState } from "react";
import { storage, auth } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ProfilePhotoUploader = ({ onUploadComplete }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    const storageRef = ref(storage, `profilePhotos/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onUploadComplete(downloadURL);
          setUploadProgress(0);
          setError(null);
        });
      }
    );
  };

  return (
    <div>
      <label>
        Upload Profile Photo:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProfilePhotoUploader;
