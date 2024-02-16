'use client';

import React, { useState } from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Page() {
	const loginSchema = z.object({
		id: z.string().max(10, { message: 'too long text' }),
		password: z.string().min(8).max(15).trim(),
	});

	type LoginSchemaType = z.infer<typeof loginSchema>;

	const loginForm = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			id: '',
			password: '',
		},
	});

	const {
		handleSubmit,
		formState: { errors },
	} = loginForm;

	const onSubmit: SubmitHandler<LoginSchemaType> = (valuse) => {
		console.log(valuse);
	};

	const onError: SubmitErrorHandler<LoginSchemaType> = (err) => {
		console.error(err);
	};

	return (
		<main>
			<section className="bg-slate-50 min-w-[500px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-5 rounded-md shadow-lg">
				<h1 className="mb-5 font-bold text-center">로그인 페이지</h1>
				<Form {...loginForm}>
					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<FormField
							control={loginForm.control}
							name="id"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel htmlFor="id">ID</FormLabel>
									<FormControl>
										<Input className="placeholder-slate-400" id="id" {...field} placeholder="id" />
									</FormControl>
									<FormDescription className="text-left">{errors.id ? <FormMessage /> : 'enter id'}</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-5">
									<FormLabel htmlFor="password">PASSWORD</FormLabel>
									<FormControl>
										<Input
											className="placeholder-slate-400"
											id="password"
											type="password"
											{...field}
											placeholder="****"
										/>
									</FormControl>
									<FormDescription className="text-left">
										{errors.password ? <FormMessage /> : 'enter password'}
									</FormDescription>
								</FormItem>
							)}
						/>
						<Button disabled={!!errors} type="submit">
							LogIn
						</Button>
					</form>
				</Form>
			</section>
		</main>
	);
}

export default Page;
