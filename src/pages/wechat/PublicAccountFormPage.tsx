import React from 'react';
import { useParams } from 'react-router-dom';
import { PublicAccountForm } from '../../components/public-account/PublicAccountForm';

export default function PublicAccountFormPage() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="max-w-7xl mx-auto py-6">
      <PublicAccountForm isEdit={isEdit} accountId={id} />
    </div>
  );
}