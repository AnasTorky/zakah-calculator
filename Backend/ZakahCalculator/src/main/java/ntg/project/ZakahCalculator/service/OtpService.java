package ntg.project.ZakahCalculator.service;

import ntg.project.ZakahCalculator.dto.response.VerifyOtpResponse;
import ntg.project.ZakahCalculator.entity.OtpCode;
import ntg.project.ZakahCalculator.entity.User;
import ntg.project.ZakahCalculator.entity.util.OtpType;

public interface OtpService {

    OtpCode generateAndSend(User user, OtpType type);

    OtpCode validateOtp(String code, OtpType type);

    VerifyOtpResponse verifyPasswordResetOtp(String otp);

    void resendVerificationOtp(String email);
}
