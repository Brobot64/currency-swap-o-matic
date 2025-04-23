
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteRecipient } from '@/utils/recipientApi';

export const DeleteRecipientDialog = ({ recipient, open, onOpenChange, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteRecipient(recipient.id);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to delete recipient:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Recipient</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete {recipient.name}?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
