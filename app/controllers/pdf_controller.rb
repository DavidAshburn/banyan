class PdfController < ApplicationController
  def downloadjob
    @job = Job.find(params[:jid])
  end
end
