import React, { useState } from 'react';
import axios from 'axios';

import {
  PageContainer,
  LeftSection,
  RightSection,
  Title,
  Input,
  Button,
  Form,
  LinkContainer,
  StyledLink,
} from './style';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi biểu mẫu mặc định

    try {
      // Gọi API đăng nhập
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password
      });

      // Kiểm tra phản hồi từ server
      if (response.status === 200) { // Kiểm tra xem phản hồi có thành công không
        const token = response.data.token; // Lấy token từ phản hồi
        localStorage.setItem('jsonwebtoken', token); // Lưu token vào localStorage
        alert("Đăng nhập thành công!"); // Thông báo thành công
        window.location.href = '/'; // Chuyển hướng đến trang dashboard
      }
    } catch (error) {
      // Xử lý lỗi từ server
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Đăng nhập thất bại. Vui lòng thử lại.";
      console.error("Error signing in:", errorMsg); // In ra lỗi
      alert(errorMsg); // Hiển thị thông báo lỗi
    }  
  };

  return (
    <PageContainer>
      <LeftSection>
        <Title>Đăng nhập</Title>
      </LeftSection>
      <RightSection>
        <Form onSubmit={handleSignIn}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
          <Button type="submit">Đăng nhập</Button>
        </Form>
        <LinkContainer>
          <StyledLink href="#">Quên mật khẩu?</StyledLink>
          <StyledLink href="/Signup">Đăng ký</StyledLink>
        </LinkContainer>
      </RightSection>
    </PageContainer>
  );
};

export default SignInPage;
