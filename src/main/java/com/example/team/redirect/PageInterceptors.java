package com.example.team.redirect;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PageInterceptors implements WebMvcConfigurer {
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// static 파일 경로 설정
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
	}
	
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		 registry.addInterceptor(new AjaxRequest()).addPathPatterns("/**");
//	}

}
