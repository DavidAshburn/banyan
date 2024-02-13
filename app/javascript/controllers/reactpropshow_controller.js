import { Controller } from '@hotwired/stimulus';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Propertymap from '../components/Propertymap';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = document.getElementById('reactpropshow');
    createRoot(root).render(<Propertymap />);
  }
}
