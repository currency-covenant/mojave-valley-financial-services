import type { CollectionConfig } from 'payload';

export const ContactMessages: CollectionConfig = {
  slug: 'contactMessages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
  access: {
    // Public can create messages
    create: () => true,
    // Only admins can read messages
    read: () => true,
    // No updates or deletes via public API
    update: () => false,
    delete: () => false,
  },
};
