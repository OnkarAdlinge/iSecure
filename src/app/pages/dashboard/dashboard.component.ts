import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


interface Product {
  name: string;
  type: string;
  icon: string;
}

interface Quote {
  customerName: string;
  id: string;
  quotesCount: number;
}

interface PremiumOption {
  years: number;
  amount: number;
  total: number;
  label?: string;
  recommended?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatChipsModule, MatSelectModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   currentView = 'product-selection'; // 'product-selection' or 'premium-details'
  selectedProduct = '';
  
  recentProducts: Product[] = [
    { name: 'eTOUCH', type: 'Term', icon: 'etouch' },
    { name: 'ACE', type: 'PAR', icon: 'ace' },
    { name: 'Smart Wealth Goal', type: 'Non PAR', icon: 'smartwealth' }
  ];

  productCategories = [
    { name: 'Term', icon: 'shield' },
    { name: 'PAR', icon: 'account_balance' },
    { name: 'ULIP', icon: 'show_chart' },
    { name: 'Annuity', icon: 'savings' },
    { name: 'Non Par', icon: 'trending_up' }
  ];

  recentQuotes: Quote[] = [
    { customerName: 'Vidisha A.', id: '997164618', quotesCount: 3 },
    { customerName: 'Vidisha A.', id: '997164613', quotesCount: 3 },
    { customerName: 'Vidisha A.', id: '997164619', quotesCount: 3 },
    { customerName: 'Vidisha A.', id: '997164618', quotesCount: 3 },
    { customerName: 'Vidisha A.', id: '997164618', quotesCount: 3 },
    { customerName: 'Vidisha A.', id: '997164618', quotesCount: 3 },
    { customerName: 'Vidisha', id: '997164607', quotesCount: 3 }
  ];

  premiumOptions: PremiumOption[] = [
    { years: 5, amount: 62124, total: 466340, label: 'Save ₹5.98 Lakhs' },
    { years: 10, amount: 46768, total: 498170, recommended: true, label: 'Save ₹6.18 Lakhs' },
    { years: 15, amount: 33894, total: 608340, label: 'Save ₹7.99 Lakhs' },
    { years: 20, amount: 27984, total: 644670, label: 'Save ₹8.29 Lakhs' },
    { years: 25, amount: 23971, total: 674240, label: 'Save ₹8.91 Lakhs' },
    { years: 30, amount: 16674, total: 663240 }
  ];

  selectedPremium = 10;
  sumAssured = 10000000;

  benefits = [
    { name: 'Accidental permanent total/ partial disability', amount: 240, currency: 'm' },
    { name: 'New critical illness', amount: 240, currency: 'm' },
    { name: 'Accidental death', amount: 240, currency: 'm' }
  ];

  switchToProductSelection() {
    this.currentView = 'product-selection';
  }

  switchToPremiumDetails() {
    this.currentView = 'premium-details';
    this.selectedProduct = 'iSecure';
  }

  selectProduct(productName: string) {
    this.selectedProduct = productName;
  }

  generateQuote(product: Product) {
    this.selectedProduct = product.name;
    this.switchToPremiumDetails();
  }

  continueToQuote() {
    if (this.selectedProduct) {
      this.switchToPremiumDetails();
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatLargeNumber(amount: number): string {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return this.formatCurrency(amount);
  }

  getBenefitIcon(benefitName: string): string {
  if (benefitName.includes('disability')) return 'accessible';
  if (benefitName.includes('illness')) return 'healing';
  if (benefitName.includes('death')) return 'security';
  return 'shield';
}
}
