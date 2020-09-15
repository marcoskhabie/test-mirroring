package facultad.trendz.service;

import facultad.trendz.dto.PostCreateDTO;
import facultad.trendz.dto.PostResponseDTO;
import facultad.trendz.exception.PostExistsException;
import facultad.trendz.model.Post;
import facultad.trendz.repository.PostRepository;
import facultad.trendz.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final TopicRepository topicRepository;

    @Autowired
    public PostService(PostRepository postRepository, TopicRepository topicRepository) {
        this.postRepository = postRepository;
        this.topicRepository=topicRepository;
    }

    public PostResponseDTO savePost(PostCreateDTO postResponseDTO){
        final Post post = new Post(postResponseDTO.getTitle(), postResponseDTO.getDescription(),
                postResponseDTO.getLink(),postResponseDTO.getCreationDate(), topicRepository.getTopicById(postResponseDTO.getTopicId()));
        postRepository.save(post);
        return new PostResponseDTO(post.getId(), post.getTitle(), post.getDescription(),post.getLink(), post.getDate(),post.getTopic().getId());
    }

    public void validatePostTitle(String title) throws PostExistsException{
        if(postRepository.existsByTitle(title))
            throw new PostExistsException("Title " + title + " already in use");
    }
}