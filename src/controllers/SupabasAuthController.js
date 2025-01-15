const supabase = require("../config/supabaseConfig");

class SupabaseAuthController {
  // Register a new user
  async registerUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Send email verification (handled automatically by Supabase)
      res.status(201).json({
        message: "Verification email sent! User created successfully!",
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "An error occurred while registering user";
      res.status(500).json({ error: errorMessage });
    }
  }

  // Login user and update online status
  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Store the session in a cookie
      res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    }
  }

  // Logout user and update online status
  async logoutUser(req, res) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      res.clearCookie("access_token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: "Email is required",
      });
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new SupabaseAuthController();
