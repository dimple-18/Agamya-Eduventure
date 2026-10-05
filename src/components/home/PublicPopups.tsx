"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import EnquiryPopup from "./EnquiryPopup";
import LeavingPopup from "./LeavingPopup";

export default function PublicPopups() {
  const pathname = usePathname();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;

  return (
    <>
      <EnquiryPopup onOpenChange={setEnquiryOpen} />
      <LeavingPopup blocked={enquiryOpen} />
    </>
  );
}
