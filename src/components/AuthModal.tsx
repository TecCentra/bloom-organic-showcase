// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
// // import { Eye, EyeOff, Loader2, User } from "lucide-react";
// // import { useUserAuth } from "@/context/UserAuthContext";

// // interface LoginFormData {
// //   email: string;
// //   password: string;
// // }

// // interface RegisterFormData {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   password: string;
// //   confirmPassword: string;
// //   phone: string;
// // }

// // interface AuthModalProps {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   onSuccess?: () => void;
// //   title?: string;
// // }

// // const LoginForm = ({ onSuccess, onSwitchToSignup }: { onSuccess: () => void; onSwitchToSignup: () => void }) => {
// //   const { setToken } = useUserAuth();
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState<LoginFormData>({
// //     email: '',
// //     password: '',
// //   });
// //   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const togglePasswordVisibility = () => setShowPassword(!showPassword);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     if (formData.password.length < 6) {
// //       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
// //       return;
// //     }

// //     setIsLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok && data.success) {
// //         const accessToken = data.data?.accessToken;
// //         const refreshToken = data.data?.refreshToken || data.refreshToken || data.refresh_token;
// //         const accessTokenExpires = data.data?.accessTokenExpires;
// //         const refreshTokenExpires = data.data?.refreshTokenExpires;
// //         if (accessToken) {
// //           setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
// //         } else {
// //           console.warn('No accessToken in response');
// //         }
// //         setMessage({ text: 'Login successful!', type: 'success' });
// //         setTimeout(() => {
// //           window.dispatchEvent(new Event('authChange'));
// //           if (onSuccess) {
// //             onSuccess();
// //           } else {
// //             navigate('/');
// //           }
// //         }, 1500);
// //       } else {
// //         setMessage({ text: data.message || 'Login failed. Please check your credentials.', type: 'error' });
// //       }
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       setMessage({ text: 'Network error. Please check your connection and backend status.', type: 'error' });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <form className="space-y-6" onSubmit={handleSubmit}>
// //         <div>
// //           <Label htmlFor="email" className="text-sm font-medium text-foreground">
// //             Email <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             required
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your email address"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="password" className="text-sm font-medium text-foreground">
// //             Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="password"
// //               name="password"
// //               type={showPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Enter your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={togglePasswordVisibility}
// //             >
// //               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //           <p className="mt-1 text-xs text-muted-foreground">
// //             Forgot password?{' '}
// //             <Button 
// //               type="button" 
// //               variant="link" 
// //               size="sm" 
// //               className="h-auto p-0 text-primary hover:text-primary/80" 
// //               onClick={() => navigate('/forgot-password')}
// //             >
// //               Reset
// //             </Button>
// //           </p>
// //         </div>

// //         {message && (
// //           <div
// //             className={`p-3 rounded-md text-sm text-center ${
// //               message.type === 'success'
// //                 ? 'bg-green-50 border border-green-200 text-green-800'
// //                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
// //             }`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full h-12 text-base font-semibold"
// //           size="lg"
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //               Signing In...
// //             </>
// //           ) : (
// //             'Sign In'
// //           )}
// //         </Button>
// //       </form>

// //       <div className="text-center pt-6">
// //         <Separator className="my-4" />
// //         <p className="text-sm text-muted-foreground mb-4">Don't have an account?</p>
// //         <Button
// //           variant="outline"
// //           onClick={onSwitchToSignup}
// //           className="px-8"
// //         >
// //           Sign Up
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };

// // const SignupForm = ({ onSuccess, onSwitchToLogin }: { onSuccess: () => void; onSwitchToLogin: () => void }) => {
// //   const { setToken } = useUserAuth();
// //   const [formData, setFormData] = useState<RegisterFormData>({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     phone: '',
// //   });
// //   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
// //     if (field === 'password') setShowPassword(!showPassword);
// //     else setShowConfirmPassword(!showConfirmPassword);
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     if (formData.password !== formData.confirmPassword) {
// //       setMessage({ text: 'Passwords do not match!', type: 'error' });
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
// //       return;
// //     }

// //     setIsLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           firstName: formData.firstName,
// //           lastName: formData.lastName,
// //           email: formData.email,
// //           password: formData.password,
// //           confirmPassword: formData.confirmPassword,
// //           phone: formData.phone,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok && data.success) {
// //         // Auto-login after successful registration
// //         const loginResponse = await fetch('https://bloom-backend-2.onrender.com/api/v1/auth/login', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             email: formData.email,
// //             password: formData.password,
// //           }),
// //         });

// //         const loginData = await loginResponse.json();
// //         if (loginResponse.ok && loginData.success) {
// //           const accessToken = loginData.data?.accessToken;
// //           const refreshToken = loginData.data?.refreshToken || loginData.refreshToken || loginData.refresh_token;
// //           const accessTokenExpires = loginData.data?.accessTokenExpires;
// //           const refreshTokenExpires = loginData.data?.refreshTokenExpires;
// //           if (accessToken) {
// //             setToken(accessToken, refreshToken, accessTokenExpires, refreshTokenExpires);
// //           }
// //         }
// //         setMessage({ text: 'Registration successful! Logging you in...', type: 'success' });
// //         setTimeout(() => {
// //           window.dispatchEvent(new Event('authChange'));
// //           if (onSuccess) {
// //             onSuccess();
// //           } else {
// //             window.location.href = '/';
// //           }
// //         }, 1500);
// //       } else {
// //         setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
// //       }
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       setMessage({ text: 'Network error. Please check your connection.', type: 'error' });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <form className="space-y-4" onSubmit={handleSubmit}>
// //         <div className="grid grid-cols-2 gap-4">
// //           <div>
// //             <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
// //               First Name <span className="text-destructive">*</span>
// //             </Label>
// //             <Input
// //               id="firstName"
// //               name="firstName"
// //               type="text"
// //               required
// //               value={formData.firstName}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //               placeholder="First name"
// //             />
// //           </div>
// //           <div>
// //             <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
// //               Last Name <span className="text-destructive">*</span>
// //             </Label>
// //             <Input
// //               id="lastName"
// //               name="lastName"
// //               type="text"
// //               required
// //               value={formData.lastName}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //               placeholder="Last name"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           <Label htmlFor="email" className="text-sm font-medium text-foreground">
// //             Email <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             required
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="Enter your email address"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="phone" className="text-sm font-medium text-foreground">
// //             Phone <span className="text-destructive">*</span>
// //           </Label>
// //           <Input
// //             id="phone"
// //             name="phone"
// //             type="tel"
// //             required
// //             value={formData.phone}
// //             onChange={handleChange}
// //             className="mt-1 bg-background border-border focus:ring-primary focus:border-primary"
// //             placeholder="0712345678"
// //           />
// //         </div>

// //         <div>
// //           <Label htmlFor="password" className="text-sm font-medium text-foreground">
// //             Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="password"
// //               name="password"
// //               type={showPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Enter your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={() => togglePasswordVisibility('password')}
// //             >
// //               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //         </div>

// //         <div>
// //           <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
// //             Confirm Password <span className="text-destructive">*</span>
// //           </Label>
// //           <div className="relative">
// //             <Input
// //               id="confirmPassword"
// //               name="confirmPassword"
// //               type={showConfirmPassword ? "text" : "password"}
// //               required
// //               minLength={6}
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               className="mt-1 bg-background border-border focus:ring-primary focus:border-primary pr-10"
// //               placeholder="Confirm your password"
// //             />
// //             <Button
// //               type="button"
// //               variant="ghost"
// //               size="sm"
// //               className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
// //               onClick={() => togglePasswordVisibility('confirmPassword')}
// //             >
// //               {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //             </Button>
// //           </div>
// //         </div>

// //         {message && (
// //           <div
// //             className={`p-3 rounded-md text-sm text-center ${
// //               message.type === 'success'
// //                 ? 'bg-green-50 border border-green-200 text-green-800'
// //                 : 'bg-destructive/10 border border-destructive/30 text-destructive'
// //             }`}
// //           >
// //             {message.text}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           disabled={isLoading}
// //           className="w-full h-12 text-base font-semibold"
// //           size="lg"
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //               Signing Up...
// //             </>
// //           ) : (
// //             'Sign Up'
// //           )}
// //         </Button>
// //       </form>

// //       <div className="text-center pt-6">
// //         <Separator className="my-4" />
// //         <p className="text-sm text-muted-foreground mb-4">Already have an account?</p>
// //         <Button
// //           variant="outline"
// //           onClick={onSwitchToLogin}
// //           className="px-8"
// //         >
// //           Sign In
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };

// // export const AuthModal = ({ open, onOpenChange, onSuccess, title = "Sign In" }: AuthModalProps) => {
// //   const [isLogin, setIsLogin] = useState(true);

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
// //         <div className="p-6">
// //           <DialogHeader className="mb-6">
// //             <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
// //               <User className="w-6 h-6 text-primary" />
// //               {isLogin ? title : 'Sign Up'}
// //             </DialogTitle>
// //           </DialogHeader>
// //           {isLogin ? (
// //             <LoginForm onSuccess={() => { onOpenChange(false); if (onSuccess) onSuccess(); }} onSwitchToSignup={() => setIsLogin(false)} />
// //           ) : (
// //             <SignupForm onSuccess={() => { onOpenChange(false); if (onSuccess) onSuccess(); }} onSwitchToLogin={() => setIsLogin(true)} />
// //           )}
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// import { Request, Response, NextFunction } from 'express';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import { query } from '../config/db';
// import {
//   BadRequestError,
//   UnauthorizedError,
//   NotFoundError,
//   InternalServerError,
//   ConflictError,
//   ValidationError,
//   ForbiddenError
// } from '../utils/errors';
// import { EmailService } from '../services/email.service';
// import {
//   createAuthTokens,
//   verifyToken,
//   verifyRefreshToken
// } from '../utils/auth';
// import { asyncHandler } from '../utils/asyncHandler';
// import { ResponseUtil } from '../utils/response.util';
// import { Logger } from '../utils/logger';
// import { logAuditEvent } from './admin.controller';

// import {
//   RegisterUserInput,
//   LoginUserInput,
//   ForgotPasswordInput,
//   ResetPasswordInput,
//   UpdatePasswordInput,
// } from '../validations/auth.validations';

// const logger = new Logger('AuthController');

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax' as const,
//   maxAge: 180 * 24 * 60 * 60 * 1000,
// };

// const sendAuthResponse = (
//   user: any,
//   statusCode: number,
//   res: Response
// ) => {
//   const { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires } = createAuthTokens({
//     id: user.user_id,
//     email: user.email,
//     role: user.role || 'customer',
//   });

//   // Set refresh token in HTTP-only cookie
//   res.cookie('refreshToken', refreshToken, {
//     ...cookieOptions,
//     expires: new Date(refreshTokenExpires)
//   });

//   // Remove sensitive data from user object
//   const userResponse = { ...user };
//   delete userResponse.password_hash;
//   delete userResponse.password_reset_token;
//   delete userResponse.password_reset_expires;

//   logger.info(`User ${user.email} authenticated successfully`);
//   ResponseUtil.success(
//     res,
//     statusCode,
//     {
//       user: userResponse,
//       accessToken,
//       refreshToken,
//       accessTokenExpires: new Date(accessTokenExpires).toISOString(),
//       refreshTokenExpires: new Date(refreshTokenExpires).toISOString(),
//     },
//     'Authentication successful!'
//   );
// };

// const sendRegistrationResponse = (
//   user: any,
//   statusCode: number,
//   res: Response
// ) => {
//   // Remove sensitive data from user object
//   const userResponse = { ...user };
//   delete userResponse.password_hash;
//   delete userResponse.password_reset_token;
//   delete userResponse.password_reset_expires;

//   logger.info(`User ${user.email} registered successfully`);
//   ResponseUtil.success(
//     res,
//     statusCode,
//     {
//       user: userResponse,
//     },
//     'User registered successfully!'
//   );
// };

// export const register = async (
//   req: Request<{}, {}, RegisterUserInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password, firstName, lastName } = req.body;
//     logger.debug(`Registering new user: ${email}`);

//     const existingUser = await query(
//       'SELECT * FROM users WHERE email = $1',
//       [email]
//     );

//     if (existingUser.rows.length > 0) {
//       logger.warn(`Registration attempt with existing email: ${email}`);
//       return ResponseUtil.conflict(res, 'Email already in use');
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     // NOTE: Postgres previously auto-generated user_id (e.g. via
//     // gen_random_uuid()). Turso/SQLite has no equivalent default, so we
//     // generate the UUID here explicitly and pass it into the INSERT.
//     const userId = crypto.randomUUID();

//     const result = await query(
//       `INSERT INTO users (user_id, email, password_hash, first_name, last_name, role)
//        VALUES ($1, $2, $3, $4, $5, 'customer')
//        RETURNING user_id, email, first_name, last_name, role`,
//       [userId, email, hashedPassword, firstName, lastName]
//     );

//     const user = result.rows[0];
//     logger.info(`New user registered: ${user.email} (ID: ${user.user_id})`);


//     try {
//       const emailService = EmailService.getInstance();
//       await emailService.sendWelcomeEmail(email, firstName);
//       logger.debug(`Welcome email queued for sending to: ${email}`);
//     } catch (error) {
//       logger.error('Failed to queue welcome email:', error);
//     }

//     sendRegistrationResponse(user, 201, res);
//   } catch (error) {
//     logger.error('Registration error:', error);
//     next(error);
//   }
// };

// export const login = async (
//   req: Request<{}, {}, LoginUserInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     logger.debug(`Login attempt for: ${email}`);
//     const ip = req.ip || req.connection.remoteAddress || '';
//     const result = await query('SELECT * FROM users WHERE email = $1', [email]);
//     const user = result.rows[0];

//     if (!user || !(await bcrypt.compare(password, user.password_hash))) {
//       logger.warn(`Failed login attempt for: ${email}`);
//       // Audit log for failed login
//       await logAuditEvent(null, 'login-fail', 'user', `Failed login for ${email}`, ip);
//       return ResponseUtil.unauthorized(res, 'Invalid email or password');
//     }

//     logger.info(`Successful login for user: ${email} (ID: ${user.user_id})`);
//     // Audit log for successful login
//     await logAuditEvent(user.user_id, 'login', 'user', `Login successful for ${email}`, ip);
//     sendAuthResponse(user, 200, res);
//   } catch (error) {
//     logger.error('Login error:', error);
//     next(error);
//   }
// };

// export const logout = (req: Request, res: Response) => {
//   const ip = req.ip || req.connection.remoteAddress || '';
//   // Audit log for logout (if user session data available)
//   if (req.user) {
//     logAuditEvent(req.user.user_id, 'logout', 'user', `Logout for ${req.user.email}`, ip);
//   }
//   res.clearCookie('refreshToken');
//   logger.info('User logged out');
//   ResponseUtil.success(res, 200, null, 'Successfully logged out');
// };

// export const refreshToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Check for refresh token in cookies or request body
//     let refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

//     if (!refreshToken) {
//       logger.warn('Refresh token missing');
//       return ResponseUtil.unauthorized(res, 'No refresh token provided');
//     }

//     const decoded = await verifyRefreshToken(refreshToken);
//     const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.id]);
//     const user = result.rows[0];

//     if (!user) {
//       logger.warn(`User not found for refresh token (ID: ${decoded.id})`);
//       return ResponseUtil.unauthorized(res, 'User no longer exists');
//     }

//     const { accessToken, refreshToken: newRefreshToken, accessTokenExpires, refreshTokenExpires } = createAuthTokens({
//       id: user.user_id,
//       email: user.email,
//       role: user.role,
//     });

//     // Set new refresh token in HTTP-only cookie
//     res.cookie('refreshToken', newRefreshToken, {
//       ...cookieOptions,
//       expires: new Date(refreshTokenExpires)
//     });

//     logger.debug(`Token refreshed for user: ${user.email}`);

//     // Return both access token and refresh token in response body
//     ResponseUtil.success(res, 200, {
//       accessToken,
//       refreshToken: newRefreshToken,
//       accessTokenExpires: new Date(accessTokenExpires).toISOString(),
//       refreshTokenExpires: new Date(refreshTokenExpires).toISOString()
//     }, 'Access token refreshed!');
//   } catch (error) {
//     logger.error('Token refresh error:', error);
//     next(error);
//   }
// };

// export const forgotPassword = async (
//   req: Request<{}, {}, ForgotPasswordInput>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body;
//     logger.debug(`Password reset requested for: ${email}`);
//     const ip = req.ip || req.connection.remoteAddress || '';
//     const result = await query('SELECT * FROM users WHERE email = $1', [email]);
//     const user = result.rows[0];

//     if (!user) {
//       logger.warn(`Password reset attempt for non-existent email: ${email}`);
//       await logAuditEvent(null, 'password-reset-request-fail', 'user', `Password reset: email not found ${email}`, ip);
//       return ResponseUtil.notFound(res, 'There is no user with that email address.');
//     }

//     // Generate a 6-digit numeric reset code (100000-999999)
//     const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
//     const passwordResetToken = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');

//     const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

//     await query(
//       'UPDATE users SET password_reset_token = $1, password_reset_token_expires_at = $2 WHERE email = $3',
//       [passwordResetToken, passwordResetExpires, email]
//     );

//     logger.info(`Password reset token generated for: ${email}`);

//     try {
//       const emailService = EmailService.getInstance();
//       await emailService.sendPasswordResetEmail(email, resetToken);
//       logger.debug(`Password reset email queued for sending to: ${email}`);
//       // Note: Exposing the reset token to the client is a security risk.
//       // The user should only interact with the token through the link in their email.
//       ResponseUtil.success(res, 200, { resetToken, expires: passwordResetExpires }, 'Password reset email sent successfully!');
//     } catch (error) {
//       logger.error('Failed to send password reset email:', error);
//       return next(new InternalServerError('Failed to send password reset email. Please try again later.'));
//     }

//   } catch (error) {
//     logger.error('Forgot password error:', error);
//     next(error);
//   }
// };

// export const resetPassword = async (
//   req: Request<{ token: string }, {}, ResetPasswordInput['body']>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const hashedToken = crypto
//       .createHash('sha256')
//       .update(req.params.token)
//       .digest('hex');

//     const result = await query(
//       'SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_token_expires_at > $2',
//       [hashedToken, new Date()]
//     );

//     const user = result.rows[0];

//     if (!user) {
//       logger.warn('Invalid or expired password reset token used');
//       return ResponseUtil.badRequest(res, 'Token is invalid or has expired');
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 12);

//     await query(
//       `UPDATE users
//        SET password_hash = $1,
//            password_reset_token = NULL,
//            password_reset_token_expires_at = NULL
//        WHERE user_id = $2`,
//       [hashedPassword, user.user_id]
//     );

//     logger.info(`Password reset successful for user: ${user.email}`);

//     try {
//       const emailService = EmailService.getInstance();
//       await emailService.sendPasswordChangedEmail(user.email);
//       logger.debug(`Password change confirmation queued for sending to: ${user.email}`);
//     } catch (error) {
//       logger.error('Failed to queue password change confirmation:', error);
//     }

//     ResponseUtil.success(res, 200, { message: 'Password updated successfully' });
//   } catch (error) {
//     logger.error('Password reset error:', error);
//     next(error);
//   }
// };

// export const updatePassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!req.user) {
//       logger.warn('Unauthorized password update attempt');
//       return ResponseUtil.unauthorized(res, 'Please log in to access this route');
//     }

//     const result = await query('SELECT * FROM users WHERE user_id = $1', [req.user.user_id]);
//     const user = result.rows[0];

//     if (!user) {
//       logger.warn(`User not found for password update (ID: ${req.user.user_id})`);
//       return ResponseUtil.notFound(res, 'User not found');
//     }

//     if (!(await bcrypt.compare(currentPassword, user.password_hash))) {
//       logger.warn(`Incorrect current password for user: ${user.email}`);
//       return ResponseUtil.unauthorized(res, 'Current password is incorrect');
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     await query('UPDATE users SET password_hash = $1 WHERE user_id = $2', [
//       hashedPassword,
//       user.user_id,
//     ]);

//     logger.info(`Password updated for user: ${user.email}`);

//     try {
//       const emailService = EmailService.getInstance();
//       await emailService.sendPasswordChangedEmail(user.email);
//       logger.debug(`Password change confirmation queued for sending to: ${user.email}`);
//     } catch (error) {
//       logger.error('Failed to queue password change confirmation:', error);
//     }

//     ResponseUtil.success(res, 200, { message: 'Password updated successfully' });
//   } catch (error) {
//     logger.error('Update password error:', error);
//     next(error);
//   }
// };

// export const getMe = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       logger.warn('Unauthorized access to user profile');
//       return ResponseUtil.unauthorized(res, 'Please log in to access this route');
//     }

//     const result = await query(
//       'SELECT user_id, email, first_name, last_name, role FROM users WHERE user_id = $1',
//       [req.user.user_id]
//     );
//     const user = result.rows[0];

//     logger.debug(`User profile accessed: ${user.email}`);
//     ResponseUtil.success(res, 200, { user });
//   } catch (error) {
//     logger.error('Get user profile error:', error);
//     next(error);
//   }
// };

// export const protect = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];
//     } else if (req.cookies.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) {
//       logger.warn('No authentication token provided');
//       return ResponseUtil.unauthorized(res, 'You are not logged in. Please log in to get access.');
//     }

//     const decoded = await verifyToken(token);
//     const result = await query('SELECT * FROM users WHERE user_id = $1', [decoded.id]);
//     const currentUser = result.rows[0];

//     if (!currentUser) {
//       logger.warn(`User not found for token (ID: ${decoded.id})`);
//       return ResponseUtil.unauthorized(res, 'The user belonging to this token no longer exists.');
//     }

//     req.user = {
//       user_id: currentUser.user_id,
//       email: currentUser.email,
//       role: currentUser.role,
//     };

//     logger.debug(`User authenticated: ${currentUser.email} (ID: ${currentUser.user_id})`);
//     next();
//   } catch (error) {
//     logger.error('Authentication error:', error);
//     return ResponseUtil.unauthorized(res, 'Invalid token. Please log in again.');
//   }
// };

// export const restrictTo = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       logger.warn(`Unauthorized access attempt by user: ${req.user?.email}`);
//       logAuditEvent(
//         req.user?.user_id || null,
//         'unauthorized-access-attempt',
//         'security',
//         { required_roles: roles, user_role: req.user?.role, path: req.originalUrl },
//         req.ip || ''
//       );
//       return ResponseUtil.forbidden(res, 'You do not have permission to perform this action');
//     }
//     logger.debug(`Access granted to ${req.user.role} for protected route`);
//     next();
//   };
// };
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export const AuthModal = ({ open, onOpenChange, onSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError(null);
  };

  const handleClose = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const body =
        mode === "login"
          ? { email, password }
          : { email, password, firstName, lastName };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed so the refreshToken cookie gets set
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      if (mode === "login") {
        // Backend returns accessToken on login
        localStorage.setItem("token", data.data.accessToken);
        window.dispatchEvent(new Event("authChange"));
        handleClose(false);
        onSuccess?.();
      } else {
        // Registration succeeded — switch to login so they can sign in
        setMode("login");
        setPassword("");
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Log In" : "Create Account"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-foreground/60">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
              }}
              className="text-primary hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;