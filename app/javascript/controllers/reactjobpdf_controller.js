import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import JobPDF from '../components/JobPDF';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('showjob');
    createRoot(root).render(<JobPDF />);
  }
}
