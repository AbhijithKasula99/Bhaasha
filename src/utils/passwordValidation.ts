export const validatePassword = (password: string): { isValid: boolean; messages: string[] } => {
  const messages: string[] = [];

  // Minimum length
  if (password.length < 12) {
    messages.push('Password must be at least 12 characters long.');
  }

  // Uppercase letters
  if (!/[A-Z]/.test(password)) {
    messages.push('Password must include at least one uppercase letter.');
  }

  // Lowercase letters
  if (!/[a-z]/.test(password)) {
    messages.push('Password must include at least one lowercase letter.');
  }

  // Numbers
  if (!/[0-9]/.test(password)) {
    messages.push('Password must include at least one number.');
  }

  // Special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    messages.push('Password must include at least one special character.');
  }

  // Avoid common patterns
  if (/password|1234|abcd|qwerty|admin/.test(password.toLowerCase())) {
    messages.push('Password must not include common patterns or dictionary words.');
  }

  return {
    isValid: messages.length === 0,
    messages,
  };
};
