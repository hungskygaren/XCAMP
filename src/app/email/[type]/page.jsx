import React from "react";
import EmailView from "@/components/features/email/EmailView";

export default function EmailPage({ params }) {
  const { type } = params;
  return (
    <>
      <EmailView type={type} />
    </>
  );
}
