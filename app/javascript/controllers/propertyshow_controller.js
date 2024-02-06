import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PropertyShow from '../components/PropertyShow';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('propertyshow');
    createRoot(root).render(<PropertyShow />);
  }
}
