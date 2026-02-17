'use server'

import prisma from '@/prisma/client'
import { IContactSubmission } from '@/types/entities/contact-submission'
import { revalidatePath } from 'next/cache'
import { createLog } from './createLog'
import { ContactSubmissionType } from '@prisma/client'

export const createContactSubmission = async (data: Omit<IContactSubmission, 'id' | 'createdAt'>) => {
  try {
    // Validate required fields
    if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.message) {
      return {
        success: false,
        error: 'Missing required fields',
        data: null
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Invalid email format',
        data: null
      }
    }

    // Build submission object - only include attributes if they exist
    const submissionData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      type: data.type.toUpperCase() as ContactSubmissionType,
      message: data.message.trim(),
      status: data.status
    }

    console.log('sub data: ', submissionData)

    const contact = await prisma.contactSubmission.create({
      data: submissionData
    })
    console.log('contact data: ', contact)

    // try {
    // await sendAdminNotification("CONTACT_SUBMISSION", {
    //   firstName: data.firstName.trim(),
    //   lastName: data.lastName.trim(),
    //   email: data.email.trim()
    // })
    // } catch (emailError) {
    // Log email error but don't fail the submission
    //   console.error('Failed to send admin notification email:', emailError)
    //   await createLog('error', 'Failed to send admin notification', {
    //     type: data.type,
    //     email: data.email,
    //     error: emailError instanceof Error ? emailError.message : 'Unknown error'
    //   })
    // }

    revalidatePath('/admin/contacts')

    return {
      success: true
    }
  } catch (error) {
    await createLog('error', 'Failed to create contact submission', {
      error: error instanceof Error ? error.message : 'Unknown error',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })

    return {
      success: false,
      error: 'Failed to create contact submission. Please try again.'
    }
  }
}
