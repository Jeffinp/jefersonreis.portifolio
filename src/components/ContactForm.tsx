import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useContactForm } from '@/hooks/useContactForm'
import EnhancedButton from './EnhancedButton'
import { fadeInUp, staggerContainer, staggerItem } from '@/hooks/useAnimations'

interface InputFieldProps {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <motion.div variants={staggerItem} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <motion.input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
        whileFocus={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  )
}

interface TextAreaFieldProps {
  id: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  rows?: number
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  rows = 5,
}) => {
  return (
    <motion.div variants={staggerItem} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <motion.textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
        whileFocus={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {value.length}/500 caracteres
      </div>
    </motion.div>
  )
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation('common')
  const { formData, formState, handleInputChange, handleSubmit, resetState } =
    useContactForm()

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <motion.form
        onSubmit={handleSubmit}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6 rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-lg dark:bg-gray-800/90"
      >
        <motion.div variants={staggerItem}>
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            {t('contact.form.title')}
          </h3>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <InputField
            id="name"
            name="name"
            type="text"
            label={t('contact.form.name')}
            placeholder={t('contact.form.name_placeholder')}
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={formState.isLoading}
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label={t('contact.form.email')}
            placeholder={t('contact.form.email_placeholder')}
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={formState.isLoading}
          />
        </div>

        <InputField
          id="subject"
          name="subject"
          type="text"
          label={t('contact.form.subject')}
          placeholder={t('contact.form.subject_placeholder')}
          value={formData.subject}
          onChange={handleInputChange}
          required
          disabled={formState.isLoading}
        />

        <TextAreaField
          id="message"
          name="message"
          label={t('contact.form.message')}
          placeholder={t('contact.form.message_placeholder')}
          value={formData.message}
          onChange={handleInputChange}
          required
          disabled={formState.isLoading}
          rows={6}
        />

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {formState.isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                {formState.errorMessage}
              </span>
            </motion.div>
          )}

          {formState.isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400"
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {t('contact.form.success_title')}
                </p>
                <p className="text-xs opacity-80">
                  {t('contact.form.success_message')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div variants={staggerItem} className="pt-4">
          <motion.button
            type={formState.isSuccess ? 'button' : 'submit'}
            disabled={formState.isLoading}
            onClick={formState.isSuccess ? resetState : undefined}
            className="relative flex w-full items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-purple-500/25 focus:ring-4 focus:ring-purple-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: formState.isLoading ? 1 : 1.02 }}
            whileTap={{ scale: formState.isLoading ? 1 : 0.98 }}
          >
            {formState.isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-inherit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )}

            <motion.div
              className={`flex items-center gap-4 ${formState.isLoading ? 'opacity-0' : 'opacity-100'}`}
              transition={{ duration: 0.2 }}
            >
              <span>
                {formState.isLoading
                  ? t('contact.form.sending')
                  : formState.isSuccess
                    ? t('contact.form.send_another')
                    : t('contact.form.send')}
              </span>

              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {formState.isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : formState.isSuccess ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </motion.span>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div variants={staggerItem} className="pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('contact.form.privacy_notice')}
          </p>
        </motion.div>
      </motion.form>

      {/* Background decorations */}
      <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl" />
      <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl" />
    </motion.div>
  )
}

export default ContactForm
