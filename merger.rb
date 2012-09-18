#ARG[0] -> podobnie to co w C 
# @  - zmienna obiektowa, może być wykorzystywana przez każdą metodę obiektu
# @@ - zmienna klasy, może być wykorzystywana przez każdą metodę klasy - można tak przechowywać informacje współdzielone przez wszystkie obiekty danej klasy - pamiętaj, że za każdym razem kiedy tworzysz obiekt
#  definiujesz tę zmienną na nowo (oprócz pierwszego razu), korzystaj więc z  // if defined?(@@ zmienna) instrukcje else definicja zmiennej // 
# Ruby przepisywanie pliku:

# plikOtwierany = File.open(plik znajdujacy sie w katalogu, r)
# plikZapisywamy = File.new("SSDL_GUI.js","w+")
# plikOtwierany.each {|linijka| plikZapisywamy.puts(linijka)}

# Budowa:

# Obiekt Plik:

# nazwa - text
# ex: boolean 
# podpliki: Array <Plik>

# Start : Zbuduj tabilce zawierajaca pliki - tutaj SSDL_GUI.js

# nazwa - name
# ex file.exists?(name)
# podpliki - subfiles
require "rubygems"
require "crack"
require "json"
# klasa pliku
class MergePart
	attr_accessor :name, :subfiles
	def initialize(name,subfiles)
		@name = name
		@subfiles = subfiles
	end
	 def to_s
    "Plik: #{@name}--#{@subfiles}"
  end
end
# Wersja tworząca tablicę obiektow typu MergePart składający się z Pliku o zadanej nazwie i tablicy podplików które mają się podczepić pod plik.
def createFileArray(filePart)
	filetab = []
	if filePart["file"].class() == Hash
		 fileName = filePart["file"]["name"]
		 fileSubfiles = []
		 mergeFilePart = MergePart.new(fileName,fileSubfiles)
		 filetab << mergeFilePart
	else
	filePart["file"].each do |fpart|
	  fileName = fpart["name"]	
	if fpart["subfiles"] != nil
		fileSubfiles = createFileArray(fpart["subfiles"])
	else
		fileSubfiles = []
	end
		mergeFilePart = MergePart.new(fileName,fileSubfiles)
		filetab << mergeFilePart
end
end
return filetab
end

#tworzy stos laczen plikow, wersja odrzucona, może później zostanie oprogramowana.
# def createFileArray(filePart)
# 	filePart["file"].each do |partty|	 	
# 	 	if partty["subfiles"] !=nil
# 	 		createFileArray(partty["subfiles"])
# 	 	end
# 	 	puts partty["name"]
# 	 end	 
# end


def createMergedFile(fileArray, file)
	fileArray.each do |part|
		# 		File.open(part.name).each do |line|
		# 	file.puts(line)
		# end
		if part.subfiles.length>0
			createMergedFile(part.subfiles,file)
		end
			file.puts("//Początek pliku " + part.name)
				File.open(part.name).each do |line|
			file.puts(line)
		end
		file.puts("//Koniec pliku " + part.name)
	end
end
filesArray = []

inputXML = File.open("merge_config.xml")
myXML  = Crack::XML.parse(inputXML)
myJSON = myXML.to_json
myJSON = JSON.parse(myJSON)
tab = createFileArray(myJSON["configMerge"])
mergedFile = File.new("SSDL_GUI.js","w+")
createMergedFile(tab,mergedFile)


