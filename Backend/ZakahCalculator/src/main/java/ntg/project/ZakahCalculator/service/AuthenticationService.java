package ntg.project.ZakahCalculator.service;


import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import ntg.project.ZakahCalculator.dto.request.*;
import ntg.project.ZakahCalculator.dto.response.*;

public interface AuthenticationService {
    AuthenticationResponse login(AuthenticationRequest request);

    void register(RegistrationRequest request);

    @Transactional
    AuthenticationResponse verifyAccount(VerifyAccountRequest request);

    AuthenticationResponse refreshToken(RefreshRequest request);

    ForgetPasswordResponse forgetPassword(ForgetPasswordRequest request) throws MessagingException;

    @Transactional
    VerifyOtpResponse verifyOtp(VerifyOtpRequest request);

    @Transactional
    ResetPasswordResponse resetPassword(ResetPasswordRequest request);

    void resendVerificationOtp(ResendOtpRequest request);
}
