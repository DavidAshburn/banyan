class PdfController < ApplicationController
  def job
    @job = Job.find(params[:jid])
  end
end
