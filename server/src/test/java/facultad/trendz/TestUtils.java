package facultad.trendz;

import facultad.trendz.dto.post.PostCreateDTO;
import facultad.trendz.dto.post.PostResponseDTO;
import facultad.trendz.dto.topic.TopicCreateDTO;
import facultad.trendz.dto.topic.TopicResponseDTO;
import facultad.trendz.dto.user.JwtResponseDTO;
import facultad.trendz.dto.user.LoginDTO;
import facultad.trendz.dto.user.UserCreateDTO;
import facultad.trendz.dto.user.UserResponseDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

public abstract class TestUtils {


    public ResponseEntity<UserResponseDTO> registerUser(String username, String email, String password, String role, int randomServerPort) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String registerUrl = "http://localhost:" + randomServerPort + "/user";
        URI registerUri = new URI(registerUrl);

        HttpHeaders registerHeaders = new HttpHeaders();
        UserCreateDTO userCreateDTO = new UserCreateDTO(email, username, password, role);
        HttpEntity<UserCreateDTO> registerRequest = new HttpEntity<>(userCreateDTO, registerHeaders);

        return restTemplate.postForEntity(registerUri, registerRequest, UserResponseDTO.class);
    }

    public ResponseEntity<JwtResponseDTO> loginUser(String email, String password, int randomServerPort) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String loginUrl = "http://localhost:" + randomServerPort + "/login";
        URI loginUri = new URI(loginUrl);

        HttpHeaders loginHeaders = new HttpHeaders();
        LoginDTO loginDTO = new LoginDTO(email, password);
        HttpEntity<LoginDTO> loginRequest = new HttpEntity<>(loginDTO, loginHeaders);

        return restTemplate.postForEntity(loginUri, loginRequest, JwtResponseDTO.class);
    }

    public ResponseEntity<TopicResponseDTO> postTopic(String jwt, String title, String description, int randomServerPort) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + jwt);

        TopicCreateDTO topic = new TopicCreateDTO(title, description);
        HttpEntity<TopicCreateDTO> topicEntity = new HttpEntity<>(topic, headers);

        final String url = "http://localhost:" + randomServerPort + "/topic";
        URI uri = new URI(url);

        return restTemplate.postForEntity(uri, topicEntity, TopicResponseDTO.class);
    }

    public ResponseEntity<PostResponseDTO> postPost(String jwt, String title, String description, String link, Long topicId, int randomServerPort) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + jwt);

        PostCreateDTO topic = new PostCreateDTO(title, description, link, topicId);
        HttpEntity<PostCreateDTO> topicEntity = new HttpEntity<>(topic, headers);

        final String url = "http://localhost:" + randomServerPort + "/post";
        URI uri = new URI(url);

        return restTemplate.postForEntity(uri, topicEntity, PostResponseDTO.class);
    }

    public void addPostToTopic(PostCreateDTO post, String jwt, int randomServerPort) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + jwt);

        HttpEntity<PostCreateDTO> postEntity = new HttpEntity<>(post, headers);

        final String postsUrl = "http://localhost:" + randomServerPort + "/post";
        URI postsUri = new URI(postsUrl);

        restTemplate.postForEntity(postsUri,postEntity, PostResponseDTO.class);
    }
}