# GentlePath Privacy Policy

**Effective date:** November 28, 2026

**App:** GentlePath for Android

## 1. About this policy

This Privacy Policy explains how GentlePath handles information when you use the GentlePath Android app, including Google sign-in, wellness features, coach chat, and optional backup features.

"GentlePath," "we," and "us" refer to Altiwelle technologies OPC Pvt Ltd. This policy applies to the GentlePath Android app and the services it connects to. Google, Firebase, and Discord have their own privacy terms for the services they provide.

## 2. Information the app handles

**Account and profile information.** When you sign in with Google, Firebase Authentication processes your account credentials and provides GentlePath with account information such as your Firebase user ID, email address, display name, and profile photo when available. GentlePath uses Firestore to store a client profile and, when applicable, a coach request and coach-assignment information.

**Wellness and app content.** Journal entries, check-ins, rituals, breathing records, and related app content are stored in the app's local encrypted database. Your settings and some profile information are stored locally as well. The app does not upload journal and check-in records to Firestore as its current sync flow.

**Microphone recordings and images.** The app asks for microphone permission when you use the voice-note feature. Voice notes and images you select for journal entries are stored locally. They may be included in a backup you choose to create. The app does not declare camera, contacts, location, or calendar permissions.

**Coach chat.** If you use coach chat, the app sends message text and attachments you choose to share to Discord. The app also retrieves Discord channel messages and may keep a local cache of messages and related display information, such as author name, message time, and attachment details. Access to messages on Discord depends on that channel's membership and permissions.

**Optional backups.** If you choose to create a backup, the app packages account data and associated media—including locally cached chat messages—into an archive and encrypts it using the password you provide. You can choose to upload that archive to Google Drive. The archive is stored in the app's private Google Drive app-data area. Google may process file metadata such as the archive name and size; the archive contents are encrypted before upload. If you lose the backup password, we cannot recover it for you.

**Android system backup and device transfer.** Depending on your Android version and device backup settings, Android may back up or transfer eligible app files and preferences. GentlePath's configured system backup rules exclude the app database and its SQLCipher key. Other app files and preferences may remain eligible for system backup or device transfer.

## 3. How we use information

- Authenticate your account and display your profile.
- Save your client profile and coach request.
- Display coach assignment information.
- Provide the wellness features you use and store their data on your device.
- Send and receive coach-chat messages when you use chat.
- Create and restore backups when you choose those features.
- Maintain, secure, and troubleshoot the service.

## 4. Who receives information

GentlePath uses these services:

- Google Sign-In and Firebase Authentication to authenticate your account.
- Firebase Firestore to store your client profile, coach request, and coach-assignment information.
- Google Drive to store an encrypted backup if you choose Drive backup.
- Discord to send and retrieve chat messages and attachments.

Coaches or other Discord channel members may be able to see messages available to them through Discord channel permissions. Review the channel and coach arrangements before sharing sensitive information. These providers process information under their own terms and privacy practices.

We do not sell personal information. [The operator must confirm this statement and remove or revise it if it is not accurate.]

## 5. Microphone and notifications

Microphone access is requested when you choose to record a voice note. You can deny or revoke microphone permission in Android settings; voice recording will then be unavailable.

Notification permission is requested when you enable a reminder feature that requires it. You can change notification permission and settings in Android at any time.

## 6. Storage and security

The app's local Room database is encrypted with SQLCipher. Backups created by the app are encrypted with the password you choose before they are uploaded to Google Drive. The app communicates with Firebase, Google, and Discord services over their network APIs.

No method of storage or transmission is completely secure. Protect your Google account and backup password, and avoid including information in a journal entry or message that you do not want stored or shared with the services described here.

## 7. Retention and account deletion

You can start account deletion in the app by going to **Settings → Delete Account**. The app asks you to confirm your Google account before proceeding. In its current implementation, the app deletes the Firebase Authentication account, the client profile and coach-request documents it owns, local database records, and account-scoped preferences.

The current app deletion flow does not delete coach-managed Firestore mapping records, Discord messages or attachments, or Google Drive backups. Those copies may remain after the in-app deletion action. This limitation must be resolved with a working deletion process before the app can claim that all associated account data is deleted.

To request deletion of data the app does not currently remove, send an email to contact@gentlepath.cc or use the deletion request form uder "Your Data" with the subject "GentlePath account deletion." Include the email used for your GentlePath account. Do not include journal entries or other wellness details in the request. We will verify the request, explain what can be deleted or must be retained, and respond within 10 business days.
By default, we retain inactive information for 180 days before deletion.

## 8. Your choices and privacy requests

You can request access to or correction or deletion of your personal information, subject to applicable law and any permitted retention requirements. Contact contact@gentlepath.cc. We may ask for information needed to verify your identity.

You can also revoke microphone and notification permissions in Android settings. You control whether to create a backup and whether to upload it to Google Drive.

## 9. Children

GentlePath is intended for users aged 18 or above. It is not intended for children under 18 years of age. If you believe a child provided personal information to GentlePath, contact contact@gentlepath.cc so we can review the request.

## 10. Changes and contact

We may update this policy when the app or its data practices change. We will update the effective date and provide notice of material changes where required.

**Questions or privacy requests:** contact@gentlepath.cc or [use the contact form](open.gentlepath.cc/userdata)

**Operated by:** Altiwelle Technologies OPC Pvt. Ltd.

**Address:** 134, Soumachandi Sarani, Kedar Bhattacharjee Lane,Howrah,West Bengal,711104, India