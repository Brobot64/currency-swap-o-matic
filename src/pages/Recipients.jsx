
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getRecipients } from '@/utils/recipientApi';
import { AddRecipientDialog } from '@/components/recipients/AddRecipientDialog';
import { ViewRecipientDialog } from '@/components/recipients/ViewRecipientDialog';
import { EditRecipientDialog } from '@/components/recipients/EditRecipientDialog';
import { DeleteRecipientDialog } from '@/components/recipients/DeleteRecipientDialog';

const Recipients = () => {
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  const [selectedRecipient, setSelectedRecipient] = React.useState(null);
  const [showViewDialog, setShowViewDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const { data: recipients, isLoading, refetch } = useQuery({
    queryKey: ['recipients'],
    queryFn: getRecipients,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Email Recipients</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Recipient
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Emails</TableHead>
              <TableHead>Rates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipients?.map((recipient) => (
              <TableRow key={recipient.id}>
                <TableCell>{recipient.name}</TableCell>
                <TableCell>{recipient.emails.join(', ')}</TableCell>
                <TableCell>{recipient.ratesToSend.join(', ')}</TableCell>
                <TableCell>{recipient.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setShowViewDialog(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setShowEditDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedRecipient(recipient);
                      setShowDeleteDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddRecipientDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          refetch();
          toast.success('Recipient added successfully');
        }}
      />

      {selectedRecipient && (
        <>
          <ViewRecipientDialog
            recipient={selectedRecipient}
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
          />
          <EditRecipientDialog
            recipient={selectedRecipient}
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            onSuccess={() => {
              refetch();
              toast.success('Recipient updated successfully');
            }}
          />
          <DeleteRecipientDialog
            recipient={selectedRecipient}
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onSuccess={() => {
              refetch();
              toast.success('Recipient deleted successfully');
            }}
          />
        </>
      )}
    </div>
  );
};

export default Recipients;
