\# Payments Server (Stripe + Firebase Admin)



Express backend to create Stripe Checkout Sessions and handle Stripe webhooks that set `premium: true` on the user’s Firestore doc after successful payment.



---



\## 1) Prerequisites



\- Node 18+

\- A Stripe account (Test mode is fine)

\- Firebase project with Firestore enabled

\- A Firebase \*\*Service Account\*\* JSON (Project Settings → Service accounts → Generate new private key)



---



\## 2) Install



From the \*\*project root\*\*:



```bash

cd server

npm install



