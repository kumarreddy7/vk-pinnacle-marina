import React, { createContext, useContext, useState } from 'react';

export type EnquiryMode = 'enquiry' | 'site-visit';

interface EnquiryContextType {
  isOpen: boolean;
  defaultProject: string;
  mode: EnquiryMode;
  isPrivacyOpen: boolean;
  openEnquiry: (options?: { project?: string; mode?: EnquiryMode }) => void;
  closeEnquiry: () => void;
  openPrivacy: () => void;
  closePrivacy: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProject, setDefaultProject] = useState('General Enquiry');
  const [mode, setMode] = useState<EnquiryMode>('enquiry');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const openEnquiry = (options?: { project?: string; mode?: EnquiryMode }) => {
    setDefaultProject(options?.project ?? 'General Enquiry');
    setMode(options?.mode ?? 'enquiry');
    setIsOpen(true);
  };

  const closeEnquiry = () => setIsOpen(false);
  const openPrivacy = () => setIsPrivacyOpen(true);
  const closePrivacy = () => setIsPrivacyOpen(false);

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        defaultProject,
        mode,
        isPrivacyOpen,
        openEnquiry,
        closeEnquiry,
        openPrivacy,
        closePrivacy,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return ctx;
}
