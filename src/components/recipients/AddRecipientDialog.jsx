
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createRecipient } from '@/utils/recipientApi';

export const AddRecipientDialog = ({ open, onOpenChange, onSuccess }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      emails: '',
      ratesToSend: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createRecipient({
        ...data,
        emails: data.emails.split(',').map(email => email.trim()),
        ratesToSend: data.ratesToSend.split(',').map(rate => rate.trim()),
      });
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Failed to create recipient:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Recipient</DialogTitle>
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
                    <Input {...field} placeholder="email1@example.com, email2@example.com" />
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
                    <Input {...field} placeholder="NGN, GHS" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Recipient</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
