"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";

interface User {
  email: string;
  name: string;
  role: string;
  domainName: string;
  token: string;
  product: string[];
  activeProducts?: string[]; // Added this field from your API response
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  domainName1: string;
  commonData: any;
  currentProduct: string;
  setCurrentProduct: (product: string) => void;
  switchProduct: (product: string) => void;
  availableProducts: string[];
  isProductAvailable: (product: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [domainName1, setDomainName] = useState<string>("");
  const [commonData, setCommonData] = useState<any>(null);
  const [currentProduct, setCurrentProduct] = useState<string>("erp");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const router = useRouter();

  const [fetchCommon, commonResponse] = useRequestHook(api.COMMON, "GET", null);

  useEffect(() => {
    const selectedDomain = localStorage.getItem("selectedDomain");
    const domainName = localStorage.getItem("domainName");

    if(selectedDomain && domainName){
      fetchCommon();
    }
   
  }, []);

  useEffect(() => {
    if (commonResponse) {
      console.log("common data", commonResponse);
      setCommonData(commonResponse);
    }
  }, [commonResponse]);

  const redirectUser = (role: string, product: string) => {
    if (role === "SuperAdmin") {
      router.replace("/domain");
      return;
    }
    const basePath = `/${product}/${role.toLowerCase()}-dashboard`;
    router.replace(basePath);
  };

  const login = (userData: User) => {
    try {
      console.log("Login userData:", userData);
      
      // Handle both product and activeProducts arrays from API response
      const products = Array.isArray(userData?.product) ? userData.product : [];
      const activeProducts = Array.isArray(userData?.activeProducts) ? userData.activeProducts : [];
      
      console.log("Products array:", products);
      console.log("Active Products array:", activeProducts);
      
      // Validate arrays are not empty
      if (products.length === 0) {
        console.warn("No products found in user data");
      }
      
      const userWithValidProducts = {
        ...userData,
        product: products,
        activeProducts: activeProducts
      };
      
      setUser(userWithValidProducts);
      
      // Save user data to localStorage with proper error handling
      try {
        localStorage.setItem("token", userData.token || "");
        localStorage.setItem("email", userData.email || "");
        localStorage.setItem("name", userData.name || "");
        localStorage.setItem("role", userData.role || "");
        localStorage.setItem("domainName", userData.domainName || "");
        
        // Always stringify arrays, even if empty
        localStorage.setItem("product", JSON.stringify(products));
        localStorage.setItem("activeProducts", JSON.stringify(activeProducts));
        
        const defaultProduct = products.length > 0 ? products[0] : "erp";
        setCurrentProduct(defaultProduct);
        localStorage.setItem("currentProduct", defaultProduct);
        
        console.log("Successfully stored in localStorage:");
        console.log("- product:", JSON.stringify(products));
        console.log("- activeProducts:", JSON.stringify(activeProducts));
        console.log("- currentProduct:", defaultProduct);
        
        // Verify storage immediately
        const storedProduct = localStorage.getItem("product");
        const storedActiveProducts = localStorage.getItem("activeProducts");
        console.log("Verification - stored product:", storedProduct);
        console.log("Verification - stored activeProducts:", storedActiveProducts);
        
      } catch (storageError) {
        console.error("Error storing data in localStorage:", storageError);
        // Handle storage quota exceeded or other storage errors
        throw new Error("Failed to save user data");
      }
      
      // Dispatch custom event for product change
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('productChanged', { 
          detail: { product: currentProduct } 
        }));
      }
      
      // Only redirect after successful storage
      const productForRedirect = products.length > 0 ? products[0] : "erp";
      redirectUser(userData.role, productForRedirect);
      
    } catch (error) {
      console.error("Error during login:", error);
      // Optionally show user-friendly error message
      throw error; // Re-throw to handle in calling component
    }
  };

  const logout = () => {
    try {
      // Clear all localStorage items
      const itemsToRemove = [
        "token", "email", "name", "role", "domainName", 
        "product", "activeProducts", "currentProduct"
      ];
      
      itemsToRemove.forEach(item => {
        localStorage.removeItem(item);
      });
      
      setUser(null);
      setCurrentProduct("erp");
      router.replace("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const switchProduct = (product: string) => {
    if (!user) {
      console.warn("No user found, cannot switch product");
      return;
    }
    
    // Check if user has access to this product
    if (!user.product.includes(product)) {
      console.warn(`User does not have access to product: ${product}`);
      return;
    }
    
    setCurrentProduct(product);
    localStorage.setItem("currentProduct", product);
    
    // Dispatch custom event for product change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productChanged', { 
        detail: { product } 
      }));
    }
    
    // Redirect to the new product dashboard
    redirectUser(user.role, product);
  };

  const isProductAvailable = (product: string): boolean => {
    return user?.product?.includes(product) || false;
  };

  const availableProducts = user?.product || [];

  const enhancedSetCurrentProduct = (product: string) => {
    if (!user || !user.product.includes(product)) {
      console.warn(`Cannot switch to product: ${product}. User does not have access.`);
      return;
    }
    
    setCurrentProduct(product);
    localStorage.setItem("currentProduct", product);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('productChanged', { 
        detail: { product } 
      }));
    }
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    if (isInitialized) return;

    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const role = localStorage.getItem("role");
      const domainName = localStorage.getItem("domainName");
      const storedProductsJson = localStorage.getItem("product");
      const storedActiveProductsJson = localStorage.getItem("activeProducts");
      const selectedDomain = localStorage.getItem("selectedDomain");
      const storedCurrentProduct = localStorage.getItem("currentProduct") || "erp";

      console.log("Initializing from localStorage:");
      console.log("- storedProductsJson:", storedProductsJson);
      console.log("- storedActiveProductsJson:", storedActiveProductsJson);

      if (token && email && name && role && domainName) {
        let products: string[] = [];
        let activeProducts: string[] = [];
        
        // Parse product array with enhanced error handling
        if (storedProductsJson) {
          try {
            const parsed = JSON.parse(storedProductsJson);
            if (Array.isArray(parsed)) {
              products = parsed;
            } else {
              console.error("Stored products is not an array:", parsed);
              products = [];
            }
          } catch (parseError) {
            console.error("Error parsing stored products:", parseError);
            products = [];
          }
        }
        
        // Parse activeProducts array
        if (storedActiveProductsJson) {
          try {
            const parsed = JSON.parse(storedActiveProductsJson);
            if (Array.isArray(parsed)) {
              activeProducts = parsed;
            } else {
              console.error("Stored activeProducts is not an array:", parsed);
              activeProducts = [];
            }
          } catch (parseError) {
            console.error("Error parsing stored activeProducts:", parseError);
            activeProducts = [];
          }
        }

        const userObj: User = {
          email,
          name,
          role,
          domainName,
          token,
          product: products,
          activeProducts: activeProducts,
        };
        
        setUser(userObj);
        
        // Validate stored product against user's available products
        const validProduct = products.length > 0 && products.includes(storedCurrentProduct) 
          ? storedCurrentProduct 
          : (products.length > 0 ? products[0] : "erp");
        
        setCurrentProduct(validProduct);
        
        // Update localStorage if the stored product was invalid
        if (validProduct !== storedCurrentProduct) {
          localStorage.setItem("currentProduct", validProduct);
        }
        
        console.log("Successfully initialized user with products:", products);
        
      } else {
        if(role==="SuperAdmin"){
          redirectUser(role, "")

        }else{
          console.log("Missing required auth data, redirecting...");
          if (selectedDomain) {
            setDomainName(selectedDomain);
            router.replace("/");
          } else {
            router.replace("/select-org");
          }
        }
       
      }
    } catch (error) {
      console.error("Error initializing auth state:", error);
      router.replace("/select-org");
    } finally {
      setIsInitialized(true);
    }
  }, [isInitialized, router]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'currentProduct' && e.newValue) {
          const newProduct = e.newValue;
          if (user?.product?.includes(newProduct)) {
            setCurrentProduct(newProduct);
          }
        } else if (e.key === 'product' && e.newValue) {
          let newProducts: string[] = [];
          try {
            newProducts = JSON.parse(e.newValue);
            if (!Array.isArray(newProducts)) {
              console.error("New products is not an array:", newProducts);
              return;
            }
          } catch (parseError) {
            console.error("Error parsing new products:", parseError);
            return;
          }

          if (user) {
            setUser({ ...user, product: newProducts });
            
            if (!newProducts.includes(currentProduct)) {
              const fallbackProduct = newProducts.length > 0 ? newProducts[0] : "erp";
              enhancedSetCurrentProduct(fallbackProduct);
            }
          }
        }
      } catch (error) {
        console.error("Error handling storage change:", error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [user, currentProduct]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        domainName1,
        commonData,
        currentProduct,
        setCurrentProduct: enhancedSetCurrentProduct,
        switchProduct,
        availableProducts,
        isProductAvailable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const useProductOperations = () => {
  const { currentProduct, switchProduct, availableProducts, isProductAvailable } = useAuth();
  
  return {
    currentProduct,
    switchProduct,
    availableProducts,
    isProductAvailable,
    canSwitchTo: (product: string) => isProductAvailable(product) && product !== currentProduct,
  };
};