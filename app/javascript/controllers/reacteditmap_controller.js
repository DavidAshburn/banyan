import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Editmap from '../components/Editmap';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('editmap');
    createRoot(root).render(<Editmap />);
  }
}
