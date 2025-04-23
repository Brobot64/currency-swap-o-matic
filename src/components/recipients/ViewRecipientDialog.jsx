
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const ViewRecipientDialog = ({ recipient, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recipient Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm">Name</h4>
            <p>{recipient.name}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Emails</h4>
            <ul className="list-disc pl-4">
              {recipient.emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm">Rates to Send</h4>
            <p>{recipient.ratesToSend.join(', ')}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Status</h4>
            <p>{recipient.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
