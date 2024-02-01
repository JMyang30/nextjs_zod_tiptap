'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import Tiptap from '@/components/editor/tiptap/Tiptap';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
	const formSchema = z.object({
		title: z.string().min(5, { message: 'to short title' }),
		description: z
			.string()
			.min(5, { message: 'description is not long enough' })
			.max(1000, { message: 'description is too long' })
			.trim(),
	});

	type FormSchemaType = z.infer<typeof formSchema>;

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			title: 'title',
			description: '',
		},
	});

	const { handleSubmit } = form;

	const onSubmit: SubmitHandler<FormSchemaType> = (valuse) => {
		console.log(valuse);
	};

	const onError: SubmitErrorHandler<FormSchemaType> = (err) => console.error(err);
	return (
		<main className="p-5">
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="mb-10">
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="mb-10">
								<FormLabel>description</FormLabel>
								<FormControl>
									<Tiptap description={field.value} onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">submit</Button>
				</form>
			</Form>
		</main>
	);
}
