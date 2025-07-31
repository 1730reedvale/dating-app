// /src/faq/FAQPage.jsx
import React from "react";
import "./FAQPage.css";

const faqs = [
  { question: "What is DateRate?", answer: "DateRate is a dating platform that allows users to rate and review each other based on real-life dating experiences." },
  { question: "How do I create a profile?", answer: "Simply sign up with your email, verify your identity, and fill out your profile with honest details and photos." },
  { question: "Is DateRate free?", answer: "Yes! You can use most basic features for free, including creating a profile and limited browsing." },
  { question: "What’s included in premium?", answer: "Premium includes unlimited browsing, full search filters, visibility boosts, and the ability to see who rated you." },
  { question: "How are ratings calculated?", answer: "Ratings are based on honesty, communication, punctuality, and overall impression — averaged from multiple user reviews." },
  { question: "Can I remove a bad rating?", answer: "You cannot remove ratings, but you can report unfair reviews for investigation." },
  { question: "Is my profile public?", answer: "Only logged-in users can view your profile, and you can control visibility and privacy settings." },
  { question: "What filters can I use to search?", answer: "Free users can filter by age and location. Premium users unlock height, religion, intent, and more." },
  { question: "How do I send an invite?", answer: "View a profile and click 'Send Invite'. Premium users can send unlimited invites." },
  { question: "Can I message anyone?", answer: "Free users can message one person per day. Premium users can message unlimited matches." },
  { question: "What is a mutual match?", answer: "A mutual match occurs when two users both express interest in each other." },
  { question: "Can I block someone?", answer: "Yes, you can block or report any user through their profile page." },
  { question: "What happens if I report someone?", answer: "Our moderation team reviews all reports within 24–48 hours and may suspend or ban abusive users." },
  { question: "Can I see who viewed my profile?", answer: "Yes, but only if you’re a premium member." },
  { question: "How do I cancel premium?", answer: "Go to Settings → Subscription and click 'Cancel'. Your premium access will continue until the billing period ends." },
  { question: "Do I need a profile picture?", answer: "Yes — profiles with photos get more attention and are required to be rated or matched." },
  { question: "How do ratings help me?", answer: "A good reputation improves your match visibility and trustworthiness on the platform." },
  { question: "Can I leave anonymous feedback?", answer: "Yes. Your reviews are anonymized, but abusive reviews will be flagged." },
  { question: "What if I don't get matches?", answer: "Update your profile, use better photos, and consider upgrading to reach more users." },
  { question: "Is DateRate LGBTQ+ friendly?", answer: "Absolutely. We support separate dating pools for gay and straight users, with inclusive features." },
  { question: "How do I reset my password?", answer: "Click 'Forgot password' on the login screen and follow the instructions." },
  { question: "What’s the Boosted Badge?", answer: "Premium users are highlighted in search results with a Boosted badge for extra visibility." },
  { question: "Can I pause my account?", answer: "Yes, under Settings you can pause your visibility or deactivate temporarily." },
  { question: "Is my payment info secure?", answer: "Yes, we use Stripe for encrypted and secure billing." },
  { question: "Can I rate someone I didn’t date?", answer: "No. You can only rate users you’ve mutually matched with and interacted with." },
  { question: "How often can I rate someone?", answer: "You can leave one rating per person, editable for up to 24 hours." },
  { question: "Can I download my data?", answer: "Yes. Visit Settings → Export to download your profile and message history." },
  { question: "What is reputation made of?", answer: "Reputation includes average star rating, review count, and reliability indicators." },
  { question: "What do stars mean?", answer: "5 stars is excellent; 1 star means poor experience. Most users average 3.5–4.5 stars." },
  { question: "How do I change my email?", answer: "Visit Settings → Account and click 'Change email'." },
  { question: "Can I use DateRate internationally?", answer: "Yes, but profile density may vary outside major US cities." },
  { question: "Is there a video chat feature?", answer: "Yes — premium users can start video chats with their matches." },
  { question: "Do I need to use my real name?", answer: "No. You can use a display name, but fake identities are against our rules." },
  { question: "Can I match outside my preferences?", answer: "Only if you change your filter settings to expand match criteria." },
  { question: "Can I search by religion or nationality?", answer: "Yes, but only with a premium account." },
  { question: "What happens if I’m banned?", answer: "Bans are permanent for severe violations. Appeals are reviewed via support." },
  { question: "Can I preview premium before paying?", answer: "Yes — we offer a 3-day trial to new users." },
  { question: "What devices can I use?", answer: "DateRate is optimized for desktop, mobile browsers, and our Android/iOS apps." },
  { question: "How do I contact support?", answer: "Click 'Support' in the footer or visit the FAQ to reach our help center." }
];

const FAQPage = () => {
  return (
    <div className="faq-page">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
