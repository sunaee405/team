package com.example.team.redirect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PageInterceptors implements WebMvcConfigurer {
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// static 파일 경로설정
		registry.addResourceHandler("/static/**")
        		.addResourceLocations("classpath:/static/");
//		registry.addResourceHandler("/javascript/**")
//				.addResourceLocations("classpath:/static/javascript/");
	}
	
	
	@Bean
	public FilterRegistrationBean<AjaxFilter> requestFilter() {
		FilterRegistrationBean<AjaxFilter> fiBean = new FilterRegistrationBean<>();
		fiBean.setFilter(new AjaxFilter());
		fiBean.addUrlPatterns("/*");
		
		return fiBean;
	}
	
	
}
