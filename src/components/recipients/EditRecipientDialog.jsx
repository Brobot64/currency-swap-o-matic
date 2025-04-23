
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateRecipient } from '@/utils/recipientApi';

export const EditRecipientDialog = ({ recipient, open, onOpenChange, onSuccess }) => {
  const form = useForm({
    defaultValues: {
      name: recipient.name,
      emails: recipient.emails.join(', '),
      ratesToSend: recipient.ratesToSend.join(', '),
      isActive: recipient.isActive,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateRecipient(recipient.id, {
        ...data,
        emails: data.emails.split(',').map(email => email.trim()),
        ratesToSend: data.ratesToSend.split(',').map(rate => rate.trim()),
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update recipient:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recipient</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emails (comma-separated)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ratesToSend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rates to Send (comma-separated)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Update Recipient</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
