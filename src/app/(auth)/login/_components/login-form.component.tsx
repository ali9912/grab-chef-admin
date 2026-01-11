'use client';
import { loginSchema } from '@/app/(auth)/login/_schemas/login.schema';
import Input from '@/common/components/form-components/input.component';
import PasswordInput from '@/common/components/form-components/password-input.component';
import { BASE_API_URL } from '@/common/constants';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { setCookie } from 'cookies-next/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false);

  const handleLoginForm = async (data: any) => {
    try {
      setPending(true);
      const response = await axios.post(`${BASE_API_URL}/admin/login`, data);
      const resData = await response.data;
      setCookie('token', resData?.token);
      router.push('/dashboard');
      setPending(false);
    } catch (error: any) {
      toast(error?.response?.data?.message || "Something went wrong");
    } finally {
      setPending(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: 'admin@grabchef.com',
      password: '1234567890',
    },
    validationSchema: loginSchema,
    onSubmit: async values => {
      await handleLoginForm(values);
    },
  });
  return (
    <form
      className='flex flex-col gap-4 sm:w-3/5 w-11/12 bg-[#fffcf2] p-6 rounded-xl'
      onSubmit={formik.handleSubmit}
    >
      <div className='flex flex-col gap-6'>
        <p className='sm:text-3xl text-2xl font-semibold'>Sign in</p>
        <div>
          <Input
            label='Email Address'
            isRequired
            name='email'
            placeholder='eg.john@example.com'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && typeof formik.errors.email === 'string'
                ? formik.errors.email
                : undefined
            }
          />
        </div>
        <div>
          <PasswordInput
            label='Password'
            isRequired
            name='password'
            placeholder='Enter Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password &&
              typeof formik.errors.password === 'string'
                ? formik.errors.password
                : undefined
            }
          />
        </div>
        {/* <div>
          <Link
            href={ROUTES.AUTH.FORGOT_PASSWORD}
            className='text-sm sm:text-base font-medium text-primary underline decoration-primary transition hover:text-primary/90'
          >
            Forgot Password?
          </Link>
        </div> */}
      </div>
      <div className='mt-5'>
        <Button
          type='submit'
          className='w-full sm:py-6 sm:text-lg'
          disabled={isPending}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
