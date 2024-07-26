import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ShowClient from '../components/clients/ShowClient';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('showclient');
    createRoot(root).render(<ShowClient />);
  }
}
