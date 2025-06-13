import { useCallback } from 'react';
import useEmailStore from '../store/emailStore';

export const useEmails = () => {
  const {
    emails,
    selectedEmail,
    loading,
    error,
    fetchEmails,
    getEmail,
    createEmail,
    updateEmail,
    deleteEmail,
    setSelectedEmail,
  } = useEmailStore();

  const handleCreateEmail = useCallback(
    async (emailData: {
      to: string;
      subject: string;
      body: string;
    }) => {
      await createEmail(emailData);
      await fetchEmails();
    },
    [createEmail, fetchEmails]
  );

  const handleUpdateEmail = useCallback(
    async (
      id: number,
      emailData: {
        to: string;
        subject: string;
        body: string;
      }
    ) => {
      await updateEmail(id, emailData);
      await fetchEmails();
    },
    [updateEmail, fetchEmails]
  );

  const handleDeleteEmail = useCallback(
    async (id: number) => {
      await deleteEmail(id);
      await fetchEmails();
    },
    [deleteEmail, fetchEmails]
  );

  return {
    emails,
    selectedEmail,
    loading,
    error,
    fetchEmails,
    getEmail,
    createEmail: handleCreateEmail,
    updateEmail: handleUpdateEmail,
    deleteEmail: handleDeleteEmail,
    setSelectedEmail,
  };
};
