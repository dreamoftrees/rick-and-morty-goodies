"use client";

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginParams } from '@/lib/session/types';
import { useSession } from '@/lib/session/SessionProvider';

export default function LoginForm({
  submitLabel = 'Get Started'
}: {
  submitLabel?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { login, name, title } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<LoginParams>({
    name: name ?? '',
    title: title ?? '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const nameRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    if (validateForm()) {
      // Form is valid, handle submission
      try {
        setLoading(true);
        await login(form);
        router.push('/gallery');
      } catch (error) {
        setLoading(false);
        console.error('Error logging in', error);
        // Handle error
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [inputName]: inputValue,
    }));

    // Clear error when user type
    setErrors(prevErrors => ({
      ...prevErrors,
      [inputName]: '',
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!form.title.trim()) {
      newErrors.title = 'Job Title is required.';
    }
    setErrors(newErrors);

    // Focus on the first input field with an error
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current?.focus();
      } else {
        titleRef.current?.focus();
      }
    }
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    nameRef.current?.focus();
  }, []);

  return (
    <Stack spacing={3} width="100%" mb={5}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          type="text"
          size="lg"
          value={form.name}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={nameRef}
        />
        {errors.name && (
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={Boolean(errors.title)}>
        <FormLabel>Job Title</FormLabel>
        <Input
          name="title"
          type="text"
          size="lg"
          value={form.title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={titleRef}
        />
        {errors.title && (
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        )}
      </FormControl>

      <Button isLoading={loading}
              onClick={handleSubmit}
              size="lg"
              colorScheme="blue">
        {submitLabel}
      </Button>
    </Stack>
  );
}
