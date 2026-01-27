/**
 * Field validation utilities for form inputs
 */

export const getFieldInputType = (fieldName: string): string => {
  const lowerField = fieldName.toLowerCase();

  if (lowerField.includes("phone") || lowerField.includes("contact")) {
    return "tel";
  }
  if (lowerField.includes("email")) {
    return "email";
  }
  if (lowerField.includes("date")) {
    return "date";
  }
  if (lowerField.includes("ip")) {
    return "text";
  }
  return "text";
};

export const getFieldPattern = (fieldName: string): string | undefined => {
  const lowerField = fieldName.toLowerCase();

  if (lowerField.includes("phone") || lowerField.includes("contact")) {
    return "[0-9\\-()\\+ ]*";
  }
  return undefined;
};

/**
 * Validate field input based on field type
 */
export const validateFieldInput = (
  fieldName: string,
  value: string
): { valid: boolean; error?: string } => {
  if (!value) {
    return { valid: true }; // Empty is valid for optional fields
  }

  const lowerField = fieldName.toLowerCase();

  // Phone/Contact validation - only numbers, dashes, parentheses, plus, spaces
  if (lowerField.includes("phone") || lowerField.includes("contact")) {
    const phoneRegex = /^[0-9\-()+ ]*$/;
    if (!phoneRegex.test(value)) {
      return {
        valid: false,
        error:
          "Phone number can only contain numbers, dashes, parentheses, plus sign, and spaces",
      };
    }
    return { valid: true };
  }

  // Email validation
  if (lowerField.includes("email")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { valid: false, error: "Please enter a valid email address" };
    }
    return { valid: true };
  }

  // Title - should not be empty if required
  if (lowerField.includes("title")) {
    if (value.trim().length === 0) {
      return { valid: false, error: "Title cannot be empty" };
    }
    if (value.length > 100) {
      return { valid: false, error: "Title must be 100 characters or less" };
    }
    return { valid: true };
  }

  // Description - should not be empty if required
  if (lowerField.includes("description")) {
    if (value.trim().length === 0) {
      return { valid: false, error: "Description cannot be empty" };
    }
    if (value.length > 500) {
      return { valid: false, error: "Description must be 500 characters or less" };
    }
    return { valid: true };
  }

  // Default validation
  return { valid: true };
};

/**
 * Validate entire form data
 */
export const validateFormData = (
  data: Record<string, string>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    const result = validateFieldInput(key, value);
    if (!result.valid && result.error) {
      errors[key] = result.error;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Only allow numeric input for phone numbers
 */
export const filterPhoneInput = (value: string): string => {
  // Allow numbers, dashes, parentheses, plus sign, and spaces
  return value.replace(/[^0-9\-()+ ]/g, "");
};
