package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FileResponse {
    private String filename;
    private String fileDownloadUri;
    private String fileType;
    private Long size;

    public FileResponse(String filename, String fileDownloadUri, String fileType, Long size) {
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }
}
