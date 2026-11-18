import { useState } from 'react';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio contact — ${form.name || 'no name'}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:chungshinglai@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
    };

    return (
        <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-row'>
                <label className='mono' htmlFor='name'>
                    name
                </label>
                <input id='name' required value={form.name} onChange={update('name')} />
            </div>
            <div className='form-row'>
                <label className='mono' htmlFor='email'>
                    email
                </label>
                <input
                    id='email'
                    type='email'
                    required
                    value={form.email}
                    onChange={update('email')}
                />
            </div>
            <div className='form-row'>
                <label className='mono' htmlFor='message'>
                    message
                </label>
                <textarea
                    id='message'
                    rows={4}
                    required
                    value={form.message}
                    onChange={update('message')}
                />
            </div>
            <button type='submit' className='mono form-submit'>
                send →
            </button>
            {sent && <p className='form-sent mono'>opening your email client...</p>}
        </form>
    );
}
