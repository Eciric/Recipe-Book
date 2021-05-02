package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Getter @Setter
public class FileResponse {
    public File file;
    public byte[] bytes;

    public FileResponse(File file, byte[] bytes) {
        this.file = file;
        this.bytes = bytes;
    }
}
