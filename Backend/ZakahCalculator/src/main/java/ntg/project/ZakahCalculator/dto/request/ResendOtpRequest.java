package ntg.project.ZakahCalculator.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResendOtpRequest {
    @NotBlank(message = "VALIDATION.REGISTRATION.USERNAME.NOT_BLANK")
    @Size(min = 1, max = 40, message = "VALIDATION.REGISTRATION.USERNAME.SIZE")
    @Pattern(regexp = "^[A-Za-z0-9_]+@[A-Za-z.-]+\\.[A-Za-z]{2,}$"
            , message = "VALIDATION.REGISTRATION.USERNAME.NOT_FORMATED {mohamed@ntg.com}")
    private String email;
}
