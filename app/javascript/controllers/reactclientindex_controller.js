import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ClientIndex from '../components/ClientIndex';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('showclients');
    createRoot(root).render(<ClientIndex />);
  }
}
