package com.Bus.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Bus.Model.User;
import com.Bus.Repository.UserRepository;


@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	  public User registerUser(User user) {
	        return userRepo.save(user);
	    }

	    public User login(String email, String password) {
	        return userRepo.findByEmailAndPassword(email, password);
	    }

	    public List<User> getAllUsers() {
	        return userRepo.findAll();
	    }
	    
	    public User getUserById(Long id) {
	        return userRepo.findById(id).orElse(null);
	    }
}
